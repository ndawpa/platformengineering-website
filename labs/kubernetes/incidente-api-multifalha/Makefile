LAB := incidente-api-multifalha
NAMESPACE := pe-incident
include ../common.mk
.PHONY: verify
verify: guard
	@kubectl rollout status deployment/api -n $(NAMESPACE) --timeout=120s
	@kubectl wait --for=condition=Ready pod/client -n $(NAMESPACE) --timeout=120s
	@test "$$(kubectl get deployment api -n $(NAMESPACE) -o jsonpath='{.status.availableReplicas}')" = "2"
	@attempt=0; until test -n "$$(kubectl get endpointslice -n $(NAMESPACE) -l kubernetes.io/service-name=api -o jsonpath='{.items[0].endpoints[0].addresses[0]}' 2>/dev/null)"; do attempt=$$((attempt + 1)); test $$attempt -lt 20 || exit 1; sleep 2; done
	@attempt=0; until kubectl exec -n $(NAMESPACE) client -- wget -qO- -T 3 http://api | grep -q 'API operacional'; do attempt=$$((attempt + 1)); test $$attempt -lt 20 || exit 1; sleep 2; done
	@echo "Incidente resolvido: configuração, readiness e tráfego validados."
