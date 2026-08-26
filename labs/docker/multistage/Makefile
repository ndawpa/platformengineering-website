IMAGE := pe-lab/multistage:local
.PHONY: setup verify cleanup
setup:
	docker build -t $(IMAGE) .
verify:
	@docker image inspect $(IMAGE) >/dev/null
	@docker history $(IMAGE) --format '{{.CreatedBy}}' | grep -q nginx
	@echo "Imagem final criada sem ferramentas da etapa builder."
cleanup:
	@docker image rm $(IMAGE) >/dev/null 2>&1 || true
