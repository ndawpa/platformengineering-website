IMAGE := pe-lab/multistage:local
.PHONY: setup verify cleanup
setup:
	docker build -t $(IMAGE) .
verify:
	@docker image inspect $(IMAGE) >/dev/null
	@docker run --rm $(IMAGE) sh -c 'test -f /usr/share/nginx/html/index.html && test ! -d /output'
	@echo "Imagem final criada sem ferramentas da etapa builder."
cleanup:
	@docker image rm $(IMAGE) >/dev/null 2>&1 || true
