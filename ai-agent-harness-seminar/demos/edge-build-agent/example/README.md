# 합성 버그 수정 재현

슬라이드의 실패→수정→재검증 화면은 아래 **합성 코드**로 재현할 수 있습니다. 실제 회사 코드나 실무 성과를 나타내지 않습니다. Python 3가 필요합니다.

```bash
cd ai-agent-harness-seminar/demos/edge-build-agent/example
rg -n 'tax_rate|discount_rate' broken_order.py
demo_dir="$(pwd)"
run_dir="$(mktemp -d)"
cp broken_order.py test_order.py "$run_dir/"
mv "$run_dir/broken_order.py" "$run_dir/order.py"
(cd "$run_dir" && python -m unittest -v)
# test_discount_first 실패: 10000 != 9900, 종료 코드 1

cp "$demo_dir/order.py" "$run_dir/order.py"
(cd "$run_dir" && python -m unittest -v)
# 두 테스트 통과, 종료 코드 0
```

원본을 건드리지 않고 임시 폴더에서 실행합니다. 끝난 뒤 `run_dir`에 출력된 경로를 삭제할 수 있습니다. 비교 지점은 `broken_order.py`와 `order.py`의 차이입니다.
