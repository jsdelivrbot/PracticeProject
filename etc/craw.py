from hangul_utils import split_syllables

file_name = "entrc_seoul.txt"
file = open(file_name, "r", encoding="utf-8" )
data = file.read()
test1 = data.split("\n")

addr = set()
result = [];
for one in test1:
    temp = one.split('|')
    addr.add(temp[4]+"-"+temp[15]+"\n")

file.close()
# 4번쨰 : 구
# 15번째 : 동

result = list(addr)
result.sort();

file = open("addrDB.txt", "w", encoding="utf-8")
for one in result:
    file.write(one)

file.close()