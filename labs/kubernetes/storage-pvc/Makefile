LAB := storage-pvc
NAMESPACE := pe-storage
include ../common.mk
.PHONY: verify
verify: guard
	@kubectl wait --for=condition=Ready pod/writer -n $(NAMESPACE) --timeout=90s
	@test "$$(kubectl get pvc data -n $(NAMESPACE) -o jsonpath='{.status.phase}')" = "Bound"
	@kubectl exec -n $(NAMESPACE) writer -- grep -q persistente /data/message.txt
	@echo "PVC vinculado e dados persistidos."
