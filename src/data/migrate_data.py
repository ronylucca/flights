import boto3
import csv
from datetime import datetime

source_file = '/tmp/BrFlights3.csv'
table_name = 'flights'
limit_date_begin = 201501
limit_date_end = 201708
dynamodb = boto3.resource(
    'dynamodb', 
    endpoint_url='http://localhost:8000', 
    region_name='us-east-1')

#
# Method responsable for write batch data on DynamoDB
# 
def batch_write(table_name, rows):
    table = dynamodb.Table(table_name)
    
    with table.batch_writer() as batch:
        for row in rows:
            batch.put_item(Item = {
                "destination": row.get('Cidade.Destino'),
                "company": row.get('Companhia.Aerea'),
                "departure": row.get('Partida.Prevista'),
                "origin": row.get('Cidade.Origem'),
                "particao": "flights",
                "identificador": str(datetime.now().timestamp()).replace('.', '')
            })
    return True


#
# Method responsable for extract and filter data from CSV file
# 
def read_csv(csv_file, items):
    rows = csv.DictReader(open(csv_file))
    for row in rows:
        if(is_valid_row(row)):
            items.append(row)


#
# Method responsable for validate each row in CSV file filtering by Flight type 
# and Departure which must be above January 2015 and below August 2017
# 
def is_valid_row(row):
    print('Validating row data {}'.format(row.get('Partida.Prevista')))
    if((row.get('Codigo.Tipo.Linha') != 'Internacional') 
        and (int(row.get('Partida.Prevista')[0:7].replace('-', '')) >= limit_date_begin) 
        and (int(row.get('Partida.Prevista')[0:7].replace('-', '')) <= limit_date_end)):
        return True
    else:
        return False


#
# Main method
# 
if __name__ == "__main__":

    items = []
    print('Preparing for extract and validate data from {}'.format(source_file))
    print('...')
    read_csv(source_file, items)
    print('Persisting bulk data on database')
    result = batch_write(table_name, items)

    if(result):
        print('Data was migrated successfully')
    else:
        print('Error while migrating data from csv file')