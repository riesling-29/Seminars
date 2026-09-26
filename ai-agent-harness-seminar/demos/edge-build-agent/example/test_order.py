import unittest

from order import total


class OrderTests(unittest.TestCase):
    def test_no_discount(self):
        self.assertEqual(total(10000, 0, 0.1), 11000)

    def test_discount_first(self):
        self.assertEqual(total(10000, 0.1, 0.1), 9900)


if __name__ == "__main__":
    unittest.main()
