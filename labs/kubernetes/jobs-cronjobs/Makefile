LAB := jobs-cronjobs
NAMESPACE := pe-jobs
include ../common.mk
.PHONY: verify
verify: guard
	@kubectl wait --for=condition=complete job/report -n $(NAMESPACE) --timeout=90s
	@test "$$(kubectl get cronjob heartbeat -n $(NAMESPACE) -o jsonpath='{.spec.suspend}')" = "false"
	@echo "Job concluído e CronJob ativo."
