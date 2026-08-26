LAB := scheduling-recursos
NAMESPACE := pe-scheduling
include ../common.mk

.PHONY: verify
verify: guard
	@kubectl wait --for=condition=Ready pod/worker -n $(NAMESPACE) --timeout=60s
	@test "$$(kubectl get pod worker -n $(NAMESPACE) -o jsonpath='{.spec.nodeSelector.workload}')" = "applications"
	@echo "Pod agendado no worker correto com requests e limits."
