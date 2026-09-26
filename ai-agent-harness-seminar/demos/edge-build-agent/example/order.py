"""합성 예제: 할인 후 세금을 적용하는 수정 구현."""


def total(price: int, discount_rate: float, tax_rate: float) -> int:
    discounted_price = price * (1 - discount_rate)
    return round(discounted_price * (1 + tax_rate))
