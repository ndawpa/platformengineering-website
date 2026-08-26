LAB := configuracao-probes
NAMESPACE := pe-config
include ../common.mk

.PHONY: verify
verify: guard
	@kubectl rollout status deployment/config-api -n $(NAMESPACE) --timeout=90s
	@test "$$(kubectl get deployment config-api -n $(NAMESPACE) -o jsonpath='{.spec.template.spec.containers[0].readinessProbe.httpGet.path}')" = "/"
	@echo "Configuração carregada e readiness probe corrigida."
