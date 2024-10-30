from typing import Optional
from barcodes.barcodes import generate_barcode, scale_data_matrix # only need for testing purposes TO REMOVE

# Paths
required_info_path = './labels/assets/template/required_info.txt'
optional_info_path = './labels/assets/template/optional_info.txt'
font_path = './labels/assets/cour.ttf'

def generate_milk_label(required_info: str, barcode: str, optional_info: Optional[str] = None) -> str:
    '''
    Generates the milk label by joining information and barcodes together.

    Args:
        required_info (str): HTML div containing the required label information
        barcode (str): HTML svg containg the milks barcode
        optional_info (str): HTML div containing the optional label information

    Returns:
        (str): The entire label as one HTML div
    '''
    
    # Make sure parameters are the right type
    if type(required_info) != str:
        raise TypeError(f'required_info is of type {type(required_info)}, but expected {str}')
    
    # Make sure barcode is an image
    if type(barcode) != str:
        raise TypeError(f'barcode is of type {type(barcode)}, but expected {str}')
    
    # Make sure optional_info is an image
    if type(optional_info) not in (str, None):
        raise TypeError(f'optional_info is of type {type(optional_info)}, but expected {str}')

    # Make the left part of the label
    barcode_div = f'<div>\n{barcode}\n</div>'
    items = f'{optional_info}\n{barcode_div}' if optional_info != None else barcode_div
    left_part = f'<div style="display: flex; flex-direction: column;">\n{items}\n</div>\n'

    # Make the entire label
    return f'<div class="milk-label" style="display: flex; gap: 10px; font-family: monospace;">\n{left_part + required_info}\n</div>'

def fill_info(template_path: str, substitution_dct: Optional[dict] = None) -> str:
    '''
    Modifies the information template to include human readables details.

    Args:
        template_path (str): Path to the information template
        substitution_dct (dict): A dictionary containing pairs of string, where the key gets replaced by the value in the template string

    Returns:
        (str): Modified information template
    '''

    # Make sure the parameters are the right types
    if type(template_path) != str:
        raise TypeError(f'template_path is of type {type(template)}, but expected {str}')

    if type(substitution_dct) not in (dict, None):
        raise TypeError(f'substitution_dct is of type {type(substitution_dct)}, but expected {dict}')
    
    for key in substitution_dct.keys():
        if type(key) != str:
            raise TypeError(f'key is of type {type(key)}, but expected {str}')
    
    for value in substitution_dct.values():
        if type(value) != str:
            raise TypeError(f'value is of type {type(value)}, but expected {str}')
    
    # Read in the template
    with open(template_path, 'r') as f:
        template = f.read()

    # Replace the appropriate strings of template
    for key in substitution_dct.keys():
        template = template.replace(key, substitution_dct[key])

    return template

def convert_info_to_html(template: str, style_format: Optional[str] = None) -> str:
    '''
    Converts a template's text into a HTML div.
    
    Args:
        template (str): The template string
        style_format (str): CSS styling for the template

    Returns:
        (str): The template as a HTML string
    '''

    # Puts every line in the template between paragraph tags: <p>line</p>
    html = '\n'.join([f'<p>{line}</p>' for line in template.strip().split('\n')])
    if style_format:
        return f'<div class="info" style="{style_format}">\n{html}\n</div>'
    return f'<div class="info">\n{html}\n</div>'
    


# Testing stuff
if __name__ == '__main__':
    # r_img = generate_info(required_info_path)
    # o_img = generate_info(optional_info_path, 'Yamaguchi', 'Hana', '123456')

    # # r_img.save('r.png')
    # # o_img.save('o.png')
    # bar = EAN13('123456789012', writer=writer.ImageWriter())

    # o_label = generate_label(r_img, bar.render(writer_options={'font_path': font_path, 'dpi': 200}), o_img)
    # no_label = generate_label(r_img, bar.render(writer_options={'font_path': font_path, 'dpi': 200}))
    # o_label.save('./generated_labels/o_label.png')
    # no_label.save('./generated_labels/no_label.png')

    optional = fill_info(optional_info_path, {
        '<<babySureName>>': 'Yamaguchi',
        '<<BOName>>': 'Hana',
        '<<MRNCODE>>': '5123' # baby mrn
    })
    # print(optional)
    optional_html = convert_info_to_html(optional)
    required_html = convert_info_to_html(open(required_info_path, 'r').read())
    # print(optional_html)
    # print(required_html)

    dm = generate_barcode('000000', 'data-matrix')
    dm = scale_data_matrix(dm, 4)
    # print(dm)

    milk_label = generate_milk_label(required_html, dm, optional_html)

    print(milk_label)

