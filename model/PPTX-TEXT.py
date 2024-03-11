from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE
import glob
import os
import re
l2=[]
def visitor(shape, fname, file):
    if shape.shape_type == MSO_SHAPE_TYPE.PICTURE:
        print(" ")
    elif hasattr(shape, "text"):
        try:
            text = shape.text
            #print(text)
            a=re.sub(r'[#]','',text)
            print(a)
            b=a.split()
            l2.append(len(b))
            file.write(text + "\n")
        except Exception as e:
            print(f"Error writing text: {e}")
def iter_shapes(prs, fname, file):
    for slide in prs.slides:
        for shape in slide.shapes:
            visitor(shape, fname, file)
file = open("MyFile.txt", "a+", encoding="utf-8")
for each_file in glob.glob("*.pptx"):
    fname = os.path.basename(each_file)
    #file.write("-------------------" + fname + "----------------------\n")
    prs = Presentation(each_file)
    #print("---------------" + fname + "-------------------")
    iter_shapes(prs, fname, file)
file.close()
print(l2)