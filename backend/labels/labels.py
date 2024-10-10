from barcode import EAN13, writer # only needed for testing purposes
from PIL import Image, ImageDraw, ImageFont
from helper import *

# Paths
required_info_path = './labels/assets/template/required_info.txt'
optional_info_path = './labels/assets/template/optional_info.txt'
font_path = './labels/assets/cour.ttf'

def generate_label(required_info, barcode, optional_info=None):
    # Make sure required_info is an image
    if type(required_info) != Image.Image:
        raise TypeError(f'required_info is of type {type(required_info)}, but expected {Image.Image}')
    
    # Make sure barcode is an image
    if type(barcode) != Image.Image:
        raise TypeError(f'barcode is of type {type(barcode)}, but expected {Image.Image}')
    
    # Make sure optional_info is an image
    if optional_info != None and type(optional_info) != Image.Image:
        raise TypeError(f'optional_info is of type {type(optional_info)}, but expected {Image.Image}')

    # First join optional_info and barcode vertically if optional_info exists
    left_img = join_images_vertically([optional_info, barcode]) if optional_info != None else barcode
    # Then join the resulting image with the required_info
    label = join_images_horizontally([left_img, required_info])

    return label

def modify_info(text, baby_sure_name, BO_name, MRN_code):
    # Make sure the text is a string
    if type(text) != str:
        raise TypeError(f'text is of type {type(text)}, but expected {str}')
    
    # Make sure the baby_sure_name is a string or doesn't exist
    if baby_sure_name != None and type(baby_sure_name) != str:
        raise TypeError(f'baby_sure_name is of type {type(baby_sure_name)}, but expected {str}')
    
    # Make sure the BO_name is a string or doesn't exist
    if BO_name != None and type(BO_name) != str:
        raise TypeError(f'BO_name is of type {type(BO_name)}, but expected {str}')
    
    # Make sure the MRN_code is a string or doesn't exist
    # AOLIN MIGHT STORE THE MRN CODE AS AN INTEGER SO MAKE SURE YOU CHECK THAT
    if MRN_code != None and type(MRN_code) != str:
        raise TypeError(f'MRN_code is of type {type(MRN_code)}, but expected {str}')

    # Replace the appropriate strings of text
    text = text if baby_sure_name == None else text.replace('<<babySureName>>', baby_sure_name)
    text = text if BO_name == None else text.replace('<<BOName>>', BO_name)
    text = text if MRN_code == None else text.replace('<<MRNCODE>>', MRN_code)

    return text

# Will probably need to change this function at some point cause we can make the optional information
# be data input from the database
# CAN PROBABLY REMOVE: Initial 1 & 2 FROM optional_info.txt SINCE THE BARCODE REPLACES THAT - i think
def generate_info(info_path, baby_sure_name=None, BO_name=None, MRN_code=None):
    # Read in the information text
    with open(info_path, 'r') as f:

        # Modify the text, ensuring that the variables are valid
        try:
            text = modify_info(f.read(), baby_sure_name, BO_name, MRN_code)
        except TypeError as e:
            raise e

        lines = text.split('\n')

    # Define font size and the width of the image (we get this from longest_line)
    fnt_size = 24
    longest_line = max(len(line) for line in lines)

    # img_size = (x, y)
    # 5/8 is approximately the ratio of courier new's width to height
    # so x is the width of the longest line with some extra whitespace
    # same with y but it counts how many lines are in the text
    img_size = (int(fnt_size * 5/8) * (longest_line + 2), (len(lines)) * 2 * fnt_size + fnt_size)

    # Colour mode, image size (x, y), background colour
    img = Image.new(mode='RGB', size=img_size, color=(255, 255, 255))
    # Font path, font size
    fnt = ImageFont.truetype(font_path, fnt_size)
    # 2D drawing interface on image: img
    drw = ImageDraw.Draw(img)

    # Draw each line of text and move the starting y position down each time
    i = 1
    for line in lines:
        # starting postion, (x, y), text, anchor, font, font colour
        drw.text((fnt_size, i * fnt_size), line, anchor='lt', font=fnt, fill=(0, 0, 0,))
        i += 2
        
    return img





# Testing stuff
if __name__ == '__main__':
    r_img = generate_info(required_info_path)
    o_img = generate_info(optional_info_path, 'Yamaguchi', 'Hana', '123456')

    # r_img.save('r.png')
    # o_img.save('o.png')
    bar = EAN13('123456789012', writer=writer.ImageWriter())

    o_label = generate_label(r_img, bar.render(writer_options={'font_path': font_path, 'dpi': 200}), o_img)
    no_label = generate_label(r_img, bar.render(writer_options={'font_path': font_path, 'dpi': 200}))
    o_label.save('./generated_labels/o_label.png')
    no_label.save('./generated_labels/no_label.png')