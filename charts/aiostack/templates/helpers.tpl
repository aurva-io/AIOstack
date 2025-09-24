{{/*
Expand the name of the chart.
*/}}
{{- define "aiostack.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "aiostack.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
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


{{/*
Create the name of the analyzer service account to use
*/}}
{{- define "observer.observerServiceAccountName" -}}
{{- if .Values.observer.serviceAccount.create -}}
    {{ default (include "observer.fullname" .) .Values.observer.serviceAccount.name }}
{{- else }}
    {{ default "default" .Values.observer.serviceAccount.name }}
{{- end -}}
{{- end -}}


{{/*
Create the name of the observer service account to use
*/}}
{{- define "observer.fullname" -}}
{{- printf  "%s" "observer" | trunc 52 | trimSuffix "-" -}}
{{- end -}}


{{/*
Allow the release namespace to be overridden
*/}}
{{- define "application.namespace" -}}
{{- default .Release.Namespace .Values.namespaceOverride -}}
{{- end -}}

{{/*
Define the name of the chart/application.
*/}}
{{- define "application.name" -}}
{{- default .Chart.Name .Values.applicationName | trunc 63 | trimSuffix "-" -}}
{{- end -}}


{{/*
Common labels
*/}}
{{- define "application.labels" -}}
helm.sh/chart: {{ include "application.chart" . }}
app.kubernetes.io/version: {{ include "application.version" . | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/part-of: {{ include "application.name" . }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "application.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Define the name of the aurva-controller/application.
*/}}
{{- define "application.version" -}}
{{ regexReplaceAll "[^a-zA-Z0-9_\\.\\-]" .Chart.Version "-" | trunc 63 | trimSuffix "-" -}}
{{- end -}}





{{/*
Expand the name of the chart.
*/}}
{{- define "aiostack-ui.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "aiostack-ui.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "aiostack-ui.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "aiostack-ui.labels" -}}
helm.sh/chart: {{ include "aiostack-ui.chart" . }}
{{ include "aiostack-ui.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "aiostack-ui.selectorLabels" -}}
app.kubernetes.io/name: {{ include "aiostack-ui.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "aiostack-ui.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "aiostack-ui.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}





