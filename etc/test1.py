from hangul_utils import split_syllables, join_jamos



test_text = "가뷁바라갇ㄹ갇ㅇ"
jamo = split_syllables(test_text)
print(jamo)