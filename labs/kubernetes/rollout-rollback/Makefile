LAB := rollout-rollback
NAMESPACE := pe-rollout
include ../common.mk

.PHONY: verify
verify: guard
	@kubectl rollout status deployment/web -n $(NAMESPACE) --timeout=90s
	@test "$$(kubectl get deployment web -n $(NAMESPACE) -o jsonpath='{.spec.template.spec.containers[0].image}')" = "nginx:1.28-alpine"
	@test "$$(kubectl get deployment web -n $(NAMESPACE) -o jsonpath='{.status.availableReplicas}')" = "3"
	@echo "Rollout saudável e versão esperada em execução."
