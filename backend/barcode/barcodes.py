# License for python-barcode found in LICENSE
from barcode import EAN13
import re

def generate_barcode(number):
    # EAN-13 Numbers are 13 digits, first 3 digits are country code, next 9 are
    # manufacturer and product code, the last digit is a check digit calculated
    # based on the preceding 12 digits
    expected_length = 12

    # Check that number is a string
    if type(number) != str:
        raise TypeError(f'Number is of type {type(number)}, but expected {str}')
    
    # Check that number is the right length
    if len(number) != expected_length:
        raise ValueError(f'Number is of length {len(number)}, but expected {expected_length}')
    
    # Check that the number only contains integers 0-9
    if not bool(re.match(r'^\d+$', number)):
        raise ValueError(f'Number contains characters, but expected only integers 0-9')

    # Generate barcode
    barcode = EAN13(number)
    return barcode





# Testing stuff
if __name__ == '__main__':
    try:
        bar = generate_barcode(123456789012)
    except TypeError:
        print(TypeError)

    try: 
        bar = generate_barcode('12345')
    except ValueError:
        print(ValueError)

    try: 
        bar = generate_barcode('1234567890ab')
    except ValueError:
        print(ValueError)

    bar = generate_barcode('123456789012')
    # bar.save('new_barcode')

    print(bar.build())
    print(bar.calculate_checksum())
    print(bar.get_fullcode())
    print(bar.to_ascii())
    print(bar.render())