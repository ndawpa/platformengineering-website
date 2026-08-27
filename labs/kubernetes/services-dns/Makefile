LAB := services-dns
NAMESPACE := pe-network
include ../common.mk

.PHONY: verify
verify: guard
	@kubectl rollout status deployment/api -n $(NAMESPACE) --timeout=120s
	@kubectl wait --for=condition=Ready pod/client -n $(NAMESPACE) --timeout=120s
	@test "$$(kubectl get endpointslice -n $(NAMESPACE) -l kubernetes.io/service-name=api -o jsonpath='{.items[0].endpoints[0].conditions.ready}')" = "true"
	@attempt=0; until kubectl exec -n $(NAMESPACE) client -- wget -qO- http://api | grep -q 'Service funcionando'; do attempt=$$((attempt + 1)); test $$attempt -lt 20 || exit 1; sleep 2; done
	@echo "Service, selector, EndpointSlice e DNS validados."
