def age_group_5_years(age_value):
    if 18 <= age_value <= 29:
        return 1
    elif 30 <= age_value <= 34:
        return 2
    elif 35 <= age_value <= 39:
        return 3
    elif 40 <= age_value <= 44:
        return 4
    elif 45 <= age_value <= 49:
        return 5
    elif 50 <= age_value <= 54:
        return 6
    elif 55 <= age_value <= 59:
        return 7
    elif 60 <= age_value <= 64:
        return 8
    elif 65 <= age_value <= 69:
        return 9
    elif 70 <= age_value <= 74:
        return 10
    elif 75 <= age_value <= 79:
        return 11
    elif 80 <= age_value <= 84:
        return 12
    return 13
  
def bmi_group(weight_kg, height_cm):
    bmi = (weight_kg*10000.0)//(height_cm**2)
    bmi = round(bmi, 2)
    if 10 <= bmi <= 24.99:
        return 1
    elif 25 <= bmi <= 29.99:
        return 2
    elif 30 <= bmi <= 34.99:
        return 3
    elif 35 <= bmi: 
        return 3

