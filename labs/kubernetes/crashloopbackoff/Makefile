SHELL := /bin/sh
CLUSTER_NAME := pe-crashloopbackoff
CONTEXT := kind-$(CLUSTER_NAME)
NAMESPACE := pe-lab

.PHONY: check setup check-failure verify cleanup destroy

check:
	@command -v docker >/dev/null || (echo "docker não encontrado"; exit 1)
	@command -v kind >/dev/null || (echo "kind não encontrado"; exit 1)
	@command -v kubectl >/dev/null || (echo "kubectl não encontrado"; exit 1)
	@docker info >/dev/null 2>&1 || (echo "Docker não está acessível"; exit 1)
	@echo "Ferramentas disponíveis."

setup: check
	@kind get clusters | grep -qx '$(CLUSTER_NAME)' || kind create cluster --config kind-config.yaml
	@kubectl config use-context $(CONTEXT)
	@kubectl apply -f broken-deployment.yaml
	@echo "Lab pronto no contexto $(CONTEXT)."

check-failure:
	@kubectl config current-context | grep -qx '$(CONTEXT)' || (echo "Contexto incorreto; esperado $(CONTEXT)"; exit 1)
	@kubectl wait --for=condition=Ready pod -l app=broken-api -n $(NAMESPACE) --timeout=15s >/dev/null 2>&1 && (echo "O pod ficou Ready; a falha esperada não ocorreu"; exit 1) || true
	@kubectl get pods -l app=broken-api -n $(NAMESPACE)
	@restarts=$$(kubectl get pods -l app=broken-api -n $(NAMESPACE) -o jsonpath='{.items[0].status.containerStatuses[0].restartCount}'); test "$${restarts:-0}" -gt 0 || (echo "Aguarde a primeira reinicialização e tente novamente"; exit 1)
	@echo "Falha reproduzida com sucesso."

verify:
	@kubectl config current-context | grep -qx '$(CONTEXT)' || (echo "Contexto incorreto; esperado $(CONTEXT)"; exit 1)
	@kubectl rollout status deployment/broken-api -n $(NAMESPACE) --timeout=90s
	@test "$$(kubectl get deployment broken-api -n $(NAMESPACE) -o jsonpath='{.status.availableReplicas}')" = "1"
	@test "$$(kubectl get pods -l app=broken-api -n $(NAMESPACE) -o jsonpath='{.items[0].status.phase}')" = "Running"
	@echo "Lab concluído: o workload está saudável."

cleanup:
	@kubectl --context $(CONTEXT) delete namespace $(NAMESPACE) --ignore-not-found

destroy:
	@kind delete cluster --name $(CLUSTER_NAME)
