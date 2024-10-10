from PIL import Image

# I can probably merge this function and the vertical function into one
def join_images_horizontally(images):
    # Calculate total width and the max height
    total_width = sum(image.width for image in images)
    max_height = max(image.height for image in images)
    
    # Create a new blank image with the total width and max height
    # Colour mode, image size (x, y), background colour
    new_image = Image.new(mode='RGB', size=(total_width, max_height), color=(255, 255, 255))
    
    # Paste each image next to each other horizontally
    x_offset = 0
    for image in images:
        new_image.paste(image, (x_offset, 0))
        x_offset += image.width
    
    return new_image

# I can probably merge this function and the horizontal function into one
def join_images_vertically(images):
    # Calculate the total height and the max width
    total_height = sum(image.height for image in images)
    max_width = max(image.width for image in images)
    
    # Create a new blank image with the max width and total height
    # Colour mode, image size (x, y), background colour
    new_image = Image.new(mode='RGB', size=(max_width, total_height), color=(255, 255, 255))
    
    # Paste each image one below the other vertically
    y_offset = 0
    for image in images:
        new_image.paste(image, (0, y_offset))
        y_offset += image.height
    
    return new_image

# def svg_to_png(svg_data):
#     png_data = svg2png(bytestring=svg_data, scale=2)
#     return Image.open(BytesIO(png_data))
    