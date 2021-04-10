from .recipe import check_required_field_recipe
from .grocery import check_required_field
import unittest


class UnitTestParser(unittest.TestCase):
    def test_check_required_field_recipe(self):
        instance = {"recipe_id": 124,
                    "spoon_id": 124,
                    "ingredients": []
                    }

        assert check_required_field_recipe(instance) == False


    def test_check_required_field(self):
        instance = {"grocery_id": 124,
                    "grocery_name": "beef slice2",
                    "spoon_id": 124,
                    "category": "meat",
                    "deadline": "12-2-1",
                    "size": "12 oz"
                    }
        assert check_required_field(instance) == True


if __name__ == '__main__':
    unittest.main()
