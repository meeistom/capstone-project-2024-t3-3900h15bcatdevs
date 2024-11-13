from barcodes import *
import pytest

def test_generate_code_128():
    # Test 1: Correct parameter type
    assert type(generate_code_128('0')) == str

    # Test 2: Incorrect parameter type
    with pytest.raises(TypeError):
        generate_code_128(0)

def test_generate_data_matrix():
    # Test 1: Correct parameter type
    assert type(generate_data_matrix('0')) == str

    # Test 1: Inorrect parameter type
    with pytest.raises(AttributeError):
        generate_data_matrix(0)

def test_scale_data_matrix():
    dm = generate_data_matrix('0')

    # Test 1: Correct parameter types
    assert type(scale_data_matrix(dm, 3)) == str

    # Test 2: Incorrect parameter type (X, O)
    with pytest.raises(TypeError):
        scale_data_matrix(0, 3)
    
    # Test 3: Incorrect parameter type (O, X)
    with pytest.raises(TypeError):
        scale_data_matrix(dm, 'a')

    # Test 4: Incorrect parameter types (X, X)
    with pytest.raises(TypeError):
        scale_data_matrix(0, 'a')
    
def test_generate_barcode():
    # Test 1: Correct parameter types
    assert type(generate_barcode('0', 'code-128')) == str
    assert type(generate_barcode('0', 'data-matrix')) == str

    # Test 2: Incorrect parameter type (X, O)
    with pytest.raises(TypeError):
        generate_barcode(1, 'code-128')

    with pytest.raises(TypeError):
        generate_barcode(1, 'data-matrix')

    # Test 3: Incorrect parameter value (O, X)
    with pytest.raises(ValueError):
        generate_barcode('0', 'ean13')

    # Test 4: Incorrect parameter type (O, X)
    with pytest.raises(ValueError):
        generate_barcode('0', 0)

    # Test 5: Incorrect parameter type and value (X, X)
    with pytest.raises(Exception):
        generate_barcode(0, 'ean13')

    # Test 6: Incorrect parameter types (X, X)
    with pytest.raises(Exception):
        generate_barcode(0, 0)


    
