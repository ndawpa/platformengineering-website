.PHONY: setup verify cleanup
setup:
	docker compose up -d --wait
verify:
	@docker compose exec -T client wget -qO- http://api:8080 | grep -q 'Docker DNS funcionando'
	@echo "DNS interno e conectividade entre containers validados."
cleanup:
	docker compose down --volumes --remove-orphans
