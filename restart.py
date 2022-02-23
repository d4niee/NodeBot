from sys import platform
import os

if platform == "linux" or platform == "linux2":
    os.system("npm run start")
elif platform == "win32":
    os.system("npm run start")
