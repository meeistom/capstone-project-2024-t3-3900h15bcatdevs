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
        raise TypeError(f'data is of type {type(data)}, but expected {str}')
    
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

def scale_data_matrix(data_matrix: str, scale: int) -> str:
    '''
    Multiplies the Data Matrice's height and width by `scale` and adds a viewBox which scales the entire Data Matrix.

    Args:
        data_matrix (str): A HTML str of the Data Matrix
        scale: (int): The factor to scale the Data Matrix by

    Returns:
        (str): The scaled Data Matrix
    '''

    if type(data_matrix) != str:
        raise TypeError(f'data_matrix is of type {type(data_matrix)}, but expected {str}')
    
    if type(scale) != int:
        raise TypeError(f'scale is of type {type(scale)}, but expected {int}')

    i = data_matrix.find('height') + 8 # 8 gets you to the first digit of the pixel value: `height="12px"`
    
    size = ''
    while data_matrix[i] != 'p': # 'p' is the p in 'px'
        size += data_matrix[i]
        i += 1

    new_size = int(size) * scale
    data_matrix = data_matrix.replace(f'{size}px', f'{new_size}px')
    data_matrix = data_matrix.replace(f'width="{new_size}px"', f'width="{new_size}px" viewBox="0 0 {size} {size}"')

    return data_matrix
