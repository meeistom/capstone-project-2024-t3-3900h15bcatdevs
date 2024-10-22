# License for python-barcode found in LICENSE
from typing import Literal
from barcode import Code128
from ppf.datamatrix import DataMatrix

def generate_barcode(data: str, format: Literal['code-128', 'data-matrix']) -> str:
    '''Generates a barcode based on the format that it is given.'''

    formats = {
        'code-128': generate_code_128,
        'data-matrix': generate_data_matrix
    }

    # Check that the correct format was input
    if format not in formats:
        raise ValueError(f'format is {format}, but expected one of the strings: {list(formats.keys())}')
    
    # Check that the data is a string
    if type(data) != str:
        raise ValueError(f'data is of type {type(data)}, but expected {str}')
    
    # Generate the barcode and catch errors
    try:
        barcode = formats[format](data)
    except Exception as e:
        raise e
    
    return barcode

def generate_code_128(data: str) -> str:
    '''Generate a Code 128 barcode whose output is a XML string'''
 
    return str(Code128(data).render(), 'utf-8')

def generate_data_matrix(data: str) -> str:
    '''Generate a Data Matrix barcode whose output is a XML string'''

    return DataMatrix(data).svg()




# Testing stuff
if __name__ == '__main__':
    try:
        generate_barcode(1234, 'code-128')
    except Exception as e:
        print(e)

    try:
        generate_barcode(1234, 'data-matrix')
    except Exception as e:
        print(e)

    try:
        generate_barcode('1234', 'asdf')
    except Exception as e:
        print(e)

    try:
        generate_barcode(1234, 1234)
    except Exception as e:
        print(e)

    dm = generate_barcode('123456', 'data-matrix')
    bar = generate_barcode('1234', 'code-128')
    print(dm)
    print(bar)