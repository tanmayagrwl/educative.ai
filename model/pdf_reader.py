import fitz
doc = fitz.open('super.pdf')
text = ""
for page in doc:
   text+=page.get_text()
print(text)
