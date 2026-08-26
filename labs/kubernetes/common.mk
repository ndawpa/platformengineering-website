SHELL := /bin/sh
CLUSTER_NAME := pe-k8s-labs
CONTEXT := kind-$(CLUSTER_NAME)

.PHONY: check setup cleanup destroy
check:
	@command -v docker >/dev/null || (echo "docker não encontrado"; exit 1)
	@command -v kind >/dev/null || (echo "kind não encontrado"; exit 1)
	@command -v kubectl >/dev/null || (echo "kubectl não encontrado"; exit 1)
	@docker info >/dev/null 2>&1 || (echo "Docker não está acessível"; exit 1)

setup: check
	@kind get clusters | grep -qx '$(CLUSTER_NAME)' || kind create cluster --config ../kind-config.yaml
	@kubectl config use-context $(CONTEXT)
	@kubectl apply -f exercise.yaml
	@echo "Lab $(LAB) pronto no contexto $(CONTEXT)."

guard:
	@kubectl config current-context | grep -qx '$(CONTEXT)' || (echo "Contexto incorreto; esperado $(CONTEXT)"; exit 1)

cleanup: guard
	@kubectl delete namespace $(NAMESPACE) --ignore-not-found

destroy:
	@kind delete cluster --name $(CLUSTER_NAME)
