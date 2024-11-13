from typing import Optional
from labels.barcodes.barcodes import generate_barcode, scale_data_matrix
from datetime import datetime
import imgkit
import base64

# Paths
# required_info_path = './labels/assets/template/required_info.txt'
required_info_path = './labels/assets/template/required_info_modified.txt' # USE `./assets/template/required_info_modified.txt` WHEN TESTING
optional_info_path = './labels/assets/template/optional_info.txt' # USE `./assets/template/optional_info.txt` WHEN TESTING
# font_path = './labels/assets/cour.ttf'

def get_milk_label(info_tuple: tuple) -> str:
    '''
    Get the milk label as a Base64 encoded string.
    
    Args:
        info_tuple (tuple): A tuple containing the information to be printed on the label
        
    Returns:
        (str): The Base64 encoded label.'''
    
    if type(info_tuple) != tuple:
        raise TypeError(f'info_tuple is of type {type(info_tuple)}, but expected {tuple}')
    
    tuple_length = 9

    if len(info_tuple) != tuple_length:
        raise ValueError(f'info_tuple is of length {len(info_tuple)}, but expected {tuple_length}')

    for i in range(5):
        if type(info_tuple[i]) != str:
            raise TypeError(f'info_tuple[{i}] is of type {type(info_tuple[i])}, but expected {str}')
    
    for i in range(5, 8):
        if type(info_tuple[i]) != int:
            raise TypeError(f'info_tuple[{i}] is of type {type(info_tuple[i])}, but expected {int}')
        
    if type(info_tuple[8]) != list:
        raise TypeError(f'info_tuple[{8}] is of type {type(info_tuple[8])}, but expected {list})')
    else:
        for i in range(len(info_tuple[8])):
            if type(info_tuple[8][i]) != str:
                raise  TypeError(f'info_tuple[8][{i}] is of type {type(info_tuple[8][i])}, but expected {str}')

    uid, bo_name, sure_name, baby_mrn, milk_type, volume, prepared_date, expiry_date, additives = info_tuple

    optional = convert_info_to_html(fill_info(optional_info_path, {
        '<<babySureName>>': sure_name,
        '<<BOName>>': bo_name,
        '<<MRNCODE>>': baby_mrn
    }))

    required = convert_info_to_html(fill_info(required_info_path, {
        '<<milkType>>': milk_type.upper(),
        '<<volume>>': str(volume),
        '<<preparedDate>>': f'Preparation Date: {datetime.fromtimestamp(prepared_date).strftime("%Y-%m-%d %H:%M:%S")}',
        '<<expiryDate>>': f'Expiry Date: {datetime.fromtimestamp(expiry_date).strftime("%Y-%m-%d %H:%M:%S")}',
        '<<additives>>': f'Additives: {", ".join(additives)}'
    }))

    dm = scale_data_matrix(generate_barcode(uid, 'data-matrix'), 4) + f'<p>{uid}</p>'

    options = {
        'width': 570
    }

    label_img = imgkit.from_string(generate_milk_label(required, dm, optional), False, options=options)

    return base64.b64encode(label_img).decode('utf-8')

def generate_milk_label(required_info: str, data_matrix: str, optional_info: Optional[str] = None) -> str:
    '''
    Generates the milk label by joining information and barcodes together.

    Args:
        required_info (str): HTML div containing the required label information
        data_matrix (str): HTML svg containing the milks data_matrix
        optional_info (str): HTML div containing the optional label information

    Returns:
        (str): The entire label as one HTML div
    '''
    
    # Make sure parameters are the right type
    if type(required_info) != str:
        raise TypeError(f'required_info is of type {type(required_info)}, but expected {str}')
    
    if type(data_matrix) != str:
        raise TypeError(f'data_matrix is of type {type(data_matrix)}, but expected {str}')
    
    if type(optional_info) != str and optional_info != None:
        raise TypeError(f'optional_info is of type {type(optional_info)}, but expected {str} or {None}')

    # Make the left part of the label
    data_matrix_div = f'<div>\n{data_matrix}\n</div>'
    items = f'{optional_info}\n{data_matrix_div}' if optional_info != None else data_matrix_div
    left_part = f'<div style="display: flex; flex-direction: column; margin-right: 10px;">\n{items}\n</div>\n'

    # Make the entire label
    return f'<div class="milk-label" style="display: flex; font-family: monospace;">\n{left_part + required_info}\n</div>'

def generate_human_label(mrn: str) -> str:
    '''
    Creates a label for the mother or the baby.
    
    Args:
        mrn (str): The human's mrn code

    Returns:
        (str): HTML div containing the human's label 
    '''

    if type(mrn) != str:
        raise TypeError('mrn is of type {mrn}, but expected {str}')

    barcode = generate_barcode(mrn, 'code-128')
    return f'<div style="font-family: monospace;">{barcode}</div>'

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
        raise TypeError(f'template_path is of type {type(template_path)}, but expected {str}')

    if type(substitution_dct) != dict and substitution_dct != None:
        raise TypeError(f'substitution_dct is of type {type(substitution_dct)}, but expected {dict} or {None}')

    if substitution_dct != None:
        for key in substitution_dct.keys():
            if type(key) != str:
                raise TypeError(f'key is of type {type(key)}, but expected {str}')
        
        for value in substitution_dct.values():
            if type(value) != str:
                raise TypeError(f'value is of type {type(value)}, but expected {str}')

    try:
        # Read in the template
        with open(template_path, 'r') as f:
            template = f.read()
    except FileNotFoundError:
        raise FileNotFoundError(f'file: `{template_path}` does not exist')
    
    if substitution_dct == None:
        return template

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

    if type(template) != str:
        raise TypeError(f'template is of type {type(template)}, but expected {str}')
    
    if type(style_format) != str and style_format != None:
        raise TypeError(f'style_format is of type {type(style_format)}, but expected {str} or {None}')


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

    # optional = fill_info(optional_info_path, {
    #     '<<babySureName>>': 'Yamaguchi',
    #     '<<BOName>>': 'Hana',
    #     '<<MRNCODE>>': '5123' # baby mrn
    # })
    # # print(optional)
    # optional_html = convert_info_to_html(optional)
    # required_html = convert_info_to_html(open(required_info_path, 'r').read())
    # # print(optional_html)
    # # print(required_html)

    # dm = generate_barcode('000000', 'data-matrix')
    # dm = scale_data_matrix(dm, 4)
    # # print(dm)

    # milk_label = generate_milk_label(required_html, dm, optional_html)

    # print(milk_label)

    # hl = generate_human_label('4234|Yamaguchi')

    # print(hl)

    # print('MUMS')
    # mum1 = generate_human_label('6361')
    # mum2 = generate_human_label('8017')
    # mum3 = generate_human_label('8220')
    # print(mum1, mum2, mum3, sep='\n\n')
    # print('MUMS')

    # print('BABIES')
    # baby1_mum1 = generate_human_label('5049')
    # baby2_mum1 = generate_human_label('5675')
    # baby3_mum3 = generate_human_label('3391')
    # print(baby1_mum1, baby2_mum1, baby3_mum3, sep='\n\n')
    # print('BABIES')

    # print('MILKS')
    # optional1 = fill_info(optional_info_path, {
    #     '<<babySureName>>': 'Bentote',
    #     '<<BOName>>': 'Lynelle',
    #     '<<MRNCODE>>': '5675' # baby mrn
    # })
    # # print(optional)
    # optional_html1 = convert_info_to_html(optional1)

    # milk_label1_mum1 = generate_milk_label(required_html, scale_data_matrix(generate_barcode('000000', 'data-matrix'), 4), optional_html1)
    # milk_label2_mum1 = generate_milk_label(required_html, scale_data_matrix(generate_barcode('000005', 'data-matrix'), 4), optional_html1)
    # milk_label3_mum1 = generate_milk_label(required_html, scale_data_matrix(generate_barcode('000006', 'data-matrix'), 4), optional_html1)
    # print(milk_label1_mum1, milk_label2_mum1, milk_label3_mum1, sep='\n\n')
    # print('MILKS')

    # print(get_milk_label((
    #     '000001',
    #     'hana',
    #     'yamaguchi',
    #     '1234',
    #     'ehm',
    #     123,
    #     170000000000,
    #     170000001000,
    #     ['to', 'be', 'added']
    # )))

    fill_info('a.txt', {'a': 'a'})
