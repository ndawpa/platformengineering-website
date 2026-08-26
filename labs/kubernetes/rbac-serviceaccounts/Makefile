LAB := rbac-serviceaccounts
NAMESPACE := pe-rbac
include ../common.mk
.PHONY: verify
verify: guard
	@kubectl auth can-i list pods -n $(NAMESPACE) --as=system:serviceaccount:$(NAMESPACE):viewer | grep -qx yes
	@kubectl auth can-i delete pods -n $(NAMESPACE) --as=system:serviceaccount:$(NAMESPACE):viewer | grep -qx no
	@echo "Permissões mínimas validadas."
