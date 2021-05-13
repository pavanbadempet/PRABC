# %%
import pypickle
print(dir(pypickle))
print(pypickle.__version__)

# %%
filepath = 'tes1t.pkl'
data = [1,2,3,4,5]
status = pypickle.save(filepath, data)

#%% Load file
data = pypickle.load(filepath)

# %%
