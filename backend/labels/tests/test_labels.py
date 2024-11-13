from labels import *
from labels.barcodes.barcodes import *
import pytest

def test_fill_info():
    # Test 1: Correct parameter types
    assert type(fill_info(required_info_path)) == str
    assert type(fill_info(optional_info_path)) == str
    assert type(fill_info(required_info_path, {'a': 'a'})) == str
    assert type(fill_info(optional_info_path, {'a': 'a'})) == str

    # Test 2: Incorrect parameter type (X)
    with pytest.raises(TypeError):
        fill_info(0)

    # Test 3: Incorrect parameter type (X, O)
    with pytest.raises(TypeError):
        fill_info(0, {'a': 'a'})

    # Test 4: Incorrect parameter type (O, X)
    with pytest.raises(TypeError):
        fill_info(required_info_path, 0)

    with pytest.raises(TypeError):
        fill_info(optional_info_path, 0)

    # Test 5: Incorrect parameter types (X, X)
    with pytest.raises(TypeError):
        fill_info(0, 0)

    # Test 6: Non existent file path
    with pytest.raises(FileNotFoundError):
        fill_info('does_not_exist.txt')

    with pytest.raises(FileNotFoundError):
        fill_info('does_not_exist.txt', {'a': 'a'})

    # Test 7: Non existent file path and incorrect parameter type (X, X)
    with pytest.raises(Exception):
        fill_info('does_not_exist.txt', 0)

def test_convert_info_to_html():
    info = fill_info(required_info_path)
    
    # Test 1: Correct parameter types
    html_1 = convert_info_to_html(info)
    assert type(html_1) == str
    assert len(html_1) == len(html_1.replace('style', ''))

    html_2 = convert_info_to_html(info, 'font-family: monospace;')
    assert type(html_2) == str
    assert len(html_2) != len(html_2.replace('style', ''))

    # Test 2: Incorrect parameter type (X)
    with pytest.raises(TypeError):
        convert_info_to_html(0)

    # Test 3: Incorrect parameter type (X, O)
    with pytest.raises(TypeError):
        convert_info_to_html(0, 'font-family: monospace;')

    # Test 4: Incorrect parameter type (O, X)
    with pytest.raises(TypeError):
        convert_info_to_html(info, 0)

    # Test 5: Incorrect parameter types (X, X)
    with pytest.raises(TypeError):
        convert_info_to_html(0, 0)
    
def test_generate_human_label():
    # Test 1: Correct parameter type
    assert type(generate_human_label('0')) == str
    assert type(generate_human_label('0000')) == str
    assert type(generate_human_label('hkasjdhf')) == str

    # Test 2: Incorrect parameter type
    with pytest.raises(TypeError):
        generate_human_label(0)

def test_generate_milk_label():
    required_info = convert_info_to_html(fill_info(required_info_path))
    optional_info = convert_info_to_html(fill_info(optional_info_path))
    dm = generate_barcode('0', 'data-matrix')

    # Test 1: Correct parameter types
    assert type(generate_milk_label(required_info, dm, optional_info)) == str

    # Test 2: Incorrect parameter type (X, O)
    with pytest.raises(TypeError):
        generate_milk_label(0, dm)
    
    # Test 3: Incorrect parameter type (O, X)
    with pytest.raises(TypeError):
        generate_milk_label(required_info, 0)

    # Test 4: Incorrect parameter types (X, X)
    with pytest.raises(TypeError):
        generate_milk_label(0, 0)

    # Test 5: Incorrect parameter type (X, O, O)
    with pytest.raises(TypeError):
        generate_milk_label(0, dm, optional_info)

    # Test 6: Incorrect parameter type (O, X, O)
    with pytest.raises(TypeError):
        generate_milk_label(required_info, 0, optional_info)

    # Test 7: Incorrect parameter type (O, O, X)
    with pytest.raises(TypeError):
        generate_milk_label(required_info, dm, 0)

    # Test 8: Incorrect parameter types: (X, X, O)
    with pytest.raises(TypeError):
        generate_milk_label(0, 0, optional_info)

    # Test 9: Incorrect parameter types: (X, O, X)
    with pytest.raises(TypeError):
        generate_milk_label(0, dm, 0)
    
    # Test 10: Incorrect parameter types: (O, X, X)
    with pytest.raises(TypeError):
        generate_milk_label(required_info, 0, 0)

    # Test 11: Incorrect parameter types: (X, X, X)
    with pytest.raises(TypeError):
        generate_milk_label(0, 0, 0)

def test_get_milk_label():
    # Test 1: Correct parameter type
    assert type(get_milk_label((
        '000000',
        'Hana',
        'Yamaguchi',
        '1234',
        'ehm',
        123,
        1700000000,
        1700001000,
        ['add1', 'add2']
    ))) == str

    # Test 2: Incorrect parameter type
    with pytest.raises(TypeError):
        get_milk_label(0)

    # Test 3: Incorrect tuple type (X, O, O, O, O, O, O, O, [O, O])
    with pytest.raises(TypeError):
        get_milk_label((
            0,
            'Hana',
            'Yamaguchi',
            '1234',
            'ehm',
            123,
            1700000000,
            1700001000,
            ['add1', 'add2']
        ))

    # Test 4: Incorrect tuple type (O, X, O, O, O, O, O, O, [O, O])
    with pytest.raises(TypeError):
        get_milk_label((
            '000000',
            0,
            'Yamaguchi',
            '1234',
            'ehm',
            123,
            1700000000,
            1700001000,
            ['add1', 'add2']
        ))

    # Test 5: Incorrect tuple type (O, O, X, O, O, O, O, O, [O, O])
    with pytest.raises(TypeError):
        get_milk_label((
            '000000',
            'Hana',
            0,
            '1234',
            'ehm',
            123,
            1700000000,
            1700001000,
            ['add1', 'add2']
        ))

    # Test 6: Incorrect tuple type (O, O, O, X, O, O, O, O, [O, O])
    with pytest.raises(TypeError):
        get_milk_label((
            '000000',
            'Hana',
            'Yamaguchi',
            0,
            'ehm',
            123,
            1700000000,
            1700001000,
            ['add1', 'add2']
        ))

    # Test 7: Incorrect tuple type (O, O, O, O, X, O, O, O, [O, O])
    with pytest.raises(TypeError):
        get_milk_label((
            '000000',
            'Hana',
            'Yamaguchi',
            '1234',
            0,
            123,
            1700000000,
            1700001000,
            ['add1', 'add2']
        ))

    # Test 8: Incorrect tuple type (O, O, O, O, O, X, O, O, [O, O])
    with pytest.raises(TypeError):
        get_milk_label((
            '000000',
            'Hana',
            'Yamaguchi',
            '1234',
            'ehm',
            'a',
            1700000000,
            1700001000,
            ['add1', 'add2']
        ))

    # Test 9: Incorrect tuple type (O, O, O, O, O, O, X, O, [O, O])
    with pytest.raises(TypeError):
        get_milk_label((
            '000000',
            'Hana',
            'Yamaguchi',
            '1234',
            'ehm',
            123,
            'a',
            1700001000,
            ['add1', 'add2']
        ))

    # Test 10: Incorrect tuple type (O, O, O, O, O, O, O, X, [O, O])
    with pytest.raises(TypeError):
        get_milk_label((
            '000000',
            'Hana',
            'Yamaguchi',
            '1234',
            'ehm',
            123,
            1700000000,
            'a',
            ['add1', 'add2']
        ))

    # Test 11: Incorrect tuple type (O, O, O, O, O, O, O, O, X)
    with pytest.raises(TypeError):
        get_milk_label((
            '000000',
            'Hana',
            'Yamaguchi',
            '1234',
            'ehm',
            123,
            1700000000,
            1700001000,
            0
        ))

    # Test 12: Incorrect tuple type (O, O, O, O, O, O, O, O, [X, O])
    with pytest.raises(TypeError):
        get_milk_label((
            '000000',
            'Hana',
            'Yamaguchi',
            '1234',
            'ehm',
            123,
            1700000000,
            1700001000,
            [0, 'add2']
        ))

    # Test 13: Incorrect tuple type (O, O, O, O, O, O, O, O, [O, X])
    with pytest.raises(TypeError):
        get_milk_label((
            '000000',
            'Hana',
            'Yamaguchi',
            '1234',
            'ehm',
            123,
            1700000000,
            1700001000,
            ['add1', 0]
        ))

    # Test 14: Incorrect tuple type (X, X, X, X, X, X, X, X, [X, X])
    with pytest.raises(TypeError):
        get_milk_label((
            0,
            0,
            0,
            0,
            0,
            'a',
            'a',
            'a',
            [0, 0]
        ))

    # Test 15: Too many elements
    with pytest.raises(ValueError):
        get_milk_label((
        '000000',
        'Hana',
        'Yamaguchi',
        '1234',
        'ehm',
        123,
        1700000000,
        1700001000,
        ['add1', 'add2'],
        'extra element'
    ))
        
    with pytest.raises(ValueError):
        get_milk_label((
        '000000',
        'Hana',
        'Yamaguchi',
        '1234',
        'ehm',
        123,
        1700000000,
        1700001000,
        ['add1', 'add2'],
        'extra element',
        'another extra element'
    ))
        
    # Test 16: Not enough elements
    with pytest.raises(ValueError):
        get_milk_label((
        '000000',
        'Hana',
        'Yamaguchi',
        '1234',
        'ehm',
        123,
        1700000000,
        1700001000
    ))
        
    with pytest.raises(ValueError):
        get_milk_label(())