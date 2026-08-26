# Lab: diagnosticar CrashLoopBackOff

Ambiente local e descartável usado pelo guia `/labs/kubernetes/diagnosticar-crashloopbackoff/`.

## Requisitos

- Docker
- kind
- kubectl
- Make

## Uso

```bash
make check
make setup
make check-failure
# Siga o diagnóstico e aplique a correção descritos no portal.
make verify
make cleanup
make destroy
```

O lab cria o cluster kind `pe-crashloopbackoff` e usa exclusivamente o namespace `pe-lab`. Não use credenciais nem dados reais no ambiente.
