LAB := init-sidecar
NAMESPACE := pe-multicontainer
include ../common.mk
.PHONY: verify
verify: guard
	@kubectl wait --for=condition=Ready pod/web -n $(NAMESPACE) --timeout=90s
	@kubectl exec -n $(NAMESPACE) web -c web -- grep -q 'gerado pelo init container' /usr/share/nginx/html/index.html
	@kubectl logs -n $(NAMESPACE) web -c log-reader | grep -q 'requisição'
	@echo "Init container e sidecar validados."
