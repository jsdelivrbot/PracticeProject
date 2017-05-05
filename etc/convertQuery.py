from hangul_utils import split_syllables


file = open("addrDB.txt", "r", encoding="utf-8")
data = file.read()
data = data.split("\n")

query = ""

for one in data:
    temp = one.split("-")
    query += "insert into addr_gudong(gu,dong) values(\""+temp[0]+"\",\""+temp[1]+"\");\n"

file = open("query1.sql", "w", encoding="utf-8")
file.write(query)