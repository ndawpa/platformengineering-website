IMAGE := pe-lab/linux:24.04
CONTAINER := pe-linux-$(LAB)
.PHONY: setup shell verify cleanup
setup:
	docker build -t $(IMAGE) ..
	@docker rm -f $(CONTAINER) >/dev/null 2>&1 || true
	docker run -d --name $(CONTAINER) --hostname $(LAB) --tmpfs /work:rw,exec,size=128m -v "$(CURDIR):/lab:ro" $(IMAGE)
	docker exec $(CONTAINER) bash /lab/setup.sh
	@echo "Ambiente pronto. Entre com: make shell"
shell:
	docker exec -it $(CONTAINER) bash
verify:
	docker exec $(CONTAINER) bash /lab/verify.sh
cleanup:
	@docker rm -f $(CONTAINER) >/dev/null 2>&1 || true
