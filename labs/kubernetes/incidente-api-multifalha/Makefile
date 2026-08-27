LAB := incidente-api-multifalha
NAMESPACE := pe-incident
include ../common.mk
.PHONY: verify
verify: guard
	@kubectl rollout status deployment/api -n $(NAMESPACE) --timeout=120s
	@test "$$(kubectl get deployment api -n $(NAMESPACE) -o jsonpath='{.status.availableReplicas}')" = "2"
	@test -n "$$(kubectl get endpointslice -n $(NAMESPACE) -l kubernetes.io/service-name=api -o jsonpath='{.items[0].endpoints[0].addresses[0]}')"
	@kubectl exec -n $(NAMESPACE) client -- wget -qO- -T 3 http://api | grep -q 'API operacional'
	@echo "Incidente resolvido: configuração, readiness e tráfego validados."
