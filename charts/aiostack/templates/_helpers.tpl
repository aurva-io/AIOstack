{{/*
Expand the name of the chart.
*/}}
{{- define "aiostack.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "aiostack.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "aiostack.labels" -}}
helm.sh/chart: {{ include "aiostack.chart" . }}
{{ include "aiostack.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "aiostack.selectorLabels" -}}
app.kubernetes.io/name: {{ include "aiostack.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
