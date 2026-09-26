"""합성 예제: 할인액에 세금을 적용하지 않는 초기 구현."""


def total(price: int, discount_rate: float, tax_rate: float) -> int:
    return round(price * (1 + tax_rate) - price * discount_rate)
