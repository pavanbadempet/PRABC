from pypickle.pypickle import (
    save,
	load,
)

__author__ = 'Erdogan Tasksen'
__email__ = 'erdogant@gmail.com'
__version__ = '0.1.0'

# module level doc-string
__doc__ = """
pypickle
=====================================================================

Description
-----------
pypickle is for saving and loading files in pickle format.

Example
-------
>>> import pypickle
>>> filepath = 'tes1t.pkl'
>>> data = [1,2,3,4,5]
>>> status = pypickle.save(filepath, data)
>>> # Load file
>>> data = pypickle.load(filepath)

References
----------
https://github.com/erdogant/pypickle

"""
