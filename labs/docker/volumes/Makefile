.PHONY: setup verify recreate cleanup
setup:
	docker compose run --rm writer sh -c 'echo dado-persistente > /data/message.txt'
verify:
	@docker compose run --rm reader grep -q dado-persistente /data/message.txt
	@echo "Dado encontrado no volume nomeado."
recreate:
	docker compose down
	docker compose up -d reader
cleanup:
	docker compose down --volumes --remove-orphans
