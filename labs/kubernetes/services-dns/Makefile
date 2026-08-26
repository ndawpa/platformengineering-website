LAB := services-dns
NAMESPACE := pe-network
include ../common.mk

.PHONY: verify
verify: guard
	@test "$$(kubectl get endpointslice -n $(NAMESPACE) -l kubernetes.io/service-name=api -o jsonpath='{.items[0].endpoints[0].conditions.ready}')" = "true"
	@kubectl exec -n $(NAMESPACE) client -- wget -qO- http://api | grep -q 'Service funcionando'
	@echo "Service, selector, EndpointSlice e DNS validados."
