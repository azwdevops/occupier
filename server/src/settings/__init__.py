PRODUCTION = False

# production settings
if PRODUCTION:
    from .production import *
# development settings
else:
    from .dev import *
