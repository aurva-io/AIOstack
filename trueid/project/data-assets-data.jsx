// Data Assets — mock data shaped like the Datasources struct.
// Each row also carries: risks, queryVolume, dataVolume, sensitiveDataLocked,
// workloads (apps that access it). Sensitive data is intentionally placeholder
// — the UI surfaces "Connect to Aurva" for it.

const ACC_PROD = "145689162369";
const ACC_DATA = "892014567103";

const sevRank = { critical: 4, high: 3, medium: 2, low: 1, none: 0 };
window.daSev = (s) => sevRank[s] ?? 0;

window.SEV_COLORS = window.SEV_COLORS || {
  critical:{bg:'#fbebeb', fg:'#a02828', border:'#ecb8b8', dot:'#d14343'},
  high:    {bg:'#fdf0e0', fg:'#8a5a15', border:'#eccfa1', dot:'#e08820'},
  medium:  {bg:'#fdf6d3', fg:'#8a6f0c', border:'#ebd289', dot:'#d9b300'},
  low:     {bg:'#eaf1f8', fg:'#34638f', border:'#cfdff0', dot:'#5d8cb8'},
  none:    {bg:'#f5f5f4', fg:'#78716c', border:'#e7e5e4', dot:'#a8a29e'}
};

const DA_ROWS = [
  // ===== AURORA PRODUCTION CLUSTER (writer + readers) =====
  {
    id:"65528bb0-3e2d-4433-87aa-eedcc0c7ae85",
    name:"arn:aws:rds:ap-south-1:145689162369:cluster:aurva-aws-default-production-rds",
    displayName:"aurva-aws-default-production-rds",
    accountId: ACC_PROD, hosting:"AWS", location:"Cloud", region:"ap-south-1",
    serviceType:"RDS", management:"ProviderManaged",
    type:"PSQL", protocol:"PSQL", version:"17.7", port:5432,
    host:"aurva-aws-default-production-rds.cluster-c7yq046404ch.ap-south-1.rds.amazonaws.com",
    connectionEndpoint:"aurva-aws-default-production-rds.cluster-c7yq046404ch.ap-south-1.rds.amazonaws.com",
    publicIP:null, privateIP:"10.0.32.45",
    creationSource:"CloudAPI", parentId:null, function:"Writer", status:"Seen",
    outpostId:"3420c33c-1ac0-53a5-8bcc-5375bf08e16b", isCluster:true,
    metadata:{ engine:"aurora-postgresql", multi_az:true, cluster_id:"aurva-aws-default-production-rds", reader_endpoint:"aurva-aws-default-production-rds.cluster-ro-c7yq046404ch.ap-south-1.rds.amazonaws.com" },
    workloads:[
      {name:"aurva-pii-analyzer", ns:"aurva-dataplane-prod", queries:"4.2M / day", role:"read+write"},
      {name:"aurva-doc-classifier", ns:"aurva-dataplane-prod", queries:"1.1M / day", role:"read"},
      {name:"aurva-gateway", ns:"aurva-gateway", queries:"880K / day", role:"read+write"},
      {name:"aurva-billing", ns:"aurva-platform", queries:"320K / day", role:"read+write"},
      {name:"aurva-admin-api", ns:"aurva-platform", queries:"120K / day", role:"read"},
    ],
    dataVolume:{ size:"412 GB", growth:"+8.2 GB/wk", tables: 84, queriesPerDay:"6.6M" },
    sensitiveDataLocked:true,
    risks:[
      {sev:"high", type:"CVE-2025-1094", note:"PostgreSQL RCE via psql"},
      {sev:"medium", type:"Backups disabled", note:"Automated backups not enforced"},
      {sev:"low", type:"Old engine version", note:"17.7 — 18.x available"},
    ],
    firstFoundAt:"2026-04-29T10:11:55Z", updatedAt:"2026-04-29T10:27:58Z"
  },
  {
    id:"ba1fa991-b5fc-4833-954b-2a05b9a36a4b",
    name:"arn:aws:rds:ap-south-1:145689162369:db:aurva-aws-default-production-rds-instance-1",
    displayName:"aurva-aws-default-production-rds-instance-1",
    accountId: ACC_PROD, hosting:"AWS", location:"Cloud", region:"ap-south-1",
    serviceType:"RDS", management:"ProviderManaged",
    type:"PSQL", protocol:"PSQL", version:"17.7", port:5432,
    host:"aurva-aws-default-production-rds-instance-1.c7yq046404ch.ap-south-1.rds.amazonaws.com",
    publicIP:null, privateIP:"10.0.32.78",
    creationSource:"CloudAPI",
    parentId:"arn:aws:rds:ap-south-1:145689162369:cluster:aurva-aws-default-production-rds",
    function:"Writer", status:"Seen",
    metadata:{ engine:"aurora-postgresql", instance_class:"db.r8g.large", storage_type:"aurora-iopt1" },
    workloads:[],
    dataVolume:{ size:"412 GB", growth:"—", tables: 84, queriesPerDay:"4.0M" },
    sensitiveDataLocked:true,
    risks:[{sev:"low", type:"Engine version", note:"Inherits cluster"}],
  },
  {
    id:"ed31a617-39c3-4d8e-aec0-9d916dc0bd44",
    name:"arn:aws:rds:ap-south-1:145689162369:db:aurva-aws-default-production-rds-instance-1-ap-south-1a",
    displayName:"aurva-aws-default-production-rds-instance-1-ap-south-1a",
    accountId: ACC_PROD, hosting:"AWS", location:"Cloud", region:"ap-south-1",
    serviceType:"RDS", management:"ProviderManaged",
    type:"PSQL", protocol:"PSQL", version:"17.7", port:5432,
    host:"aurva-aws-default-production-rds-instance-1-ap-south-1a.c7yq046404ch.ap-south-1.rds.amazonaws.com",
    publicIP:null, privateIP:"10.0.33.12",
    creationSource:"CloudAPI",
    parentId:"arn:aws:rds:ap-south-1:145689162369:cluster:aurva-aws-default-production-rds",
    function:"Reader", status:"Seen",
    metadata:{ engine:"aurora-postgresql", instance_class:"db.t4g.large", storage_type:"aurora-iopt1" },
    workloads:[],
    dataVolume:{ size:"412 GB", growth:"—", tables: 84, queriesPerDay:"2.6M" },
    sensitiveDataLocked:true,
    risks:[],
  },

  // ===== UAT standalone =====
  {
    id:"72e1d92b-dbbd-4d6b-9340-f3c18b9fe024",
    name:"arn:aws:rds:ap-south-1:145689162369:db:aurva-aws-default-uat-rds",
    displayName:"aurva-aws-default-uat-rds",
    accountId: ACC_PROD, hosting:"AWS", location:"Cloud", region:"ap-south-1",
    serviceType:"RDS", management:"ProviderManaged",
    type:"PSQL", protocol:"PSQL", version:"18.2", port:5432,
    host:"aurva-aws-default-uat-rds.c7yq046404ch.ap-south-1.rds.amazonaws.com",
    publicIP:null, privateIP:"10.0.40.21",
    creationSource:"CloudAPI", parentId:null, function:"NA", status:"Seen",
    metadata:{ engine:"postgres", instance_class:"db.t4g.medium", storage_type:"gp3" },
    workloads:[
      {name:"aurva-pii-analyzer", ns:"aurva-dataplane-uat", queries:"640K / day", role:"read+write"},
      {name:"aurva-ocr", ns:"aurva-dataplane-uat", queries:"180K / day", role:"read"},
    ],
    dataVolume:{ size:"38 GB", growth:"+0.4 GB/wk", tables: 84, queriesPerDay:"820K" },
    sensitiveDataLocked:true,
    risks:[
      {sev:"medium", type:"Mixed-environment access", note:"UAT data accessed from prod cluster"},
    ],
  },

  // ===== S3 ALB logs =====
  {
    id:"776ae04c-7f7f-4676-b19c-f2c6f8101c4f",
    name:"arn:aws:s3:::aurva-alb-acceslogs", displayName:"aurva-alb-acceslogs",
    accountId: ACC_PROD, hosting:"AWS", location:"Cloud", region:"ap-south-1",
    serviceType:"S3", management:"ProviderManaged",
    type:"ObjectStorage", protocol:"", version:"", port:443,
    host:"aurva-alb-acceslogs.s3.ap-south-1.amazonaws.com",
    publicIP:null, privateIP:null,
    creationSource:"CloudAPI", parentId:null, function:"NA", status:"Seen",
    metadata:null, workloads:[],
    dataVolume:{ size:"94 GB", growth:"+1.2 GB/wk", objects:"1.2M", queriesPerDay:"—" },
    sensitiveDataLocked:true,
    risks:[],
  },
  {
    id:"s3-data-lake-raw",
    name:"arn:aws:s3:::data-lake-raw", displayName:"data-lake-raw",
    accountId: ACC_DATA, hosting:"AWS", location:"Cloud", region:"ap-south-1",
    serviceType:"S3", management:"ProviderManaged",
    type:"ObjectStorage", port:443,
    host:"data-lake-raw.s3.ap-south-1.amazonaws.com",
    publicIP:null, privateIP:null, creationSource:"CloudAPI", parentId:null,
    function:"NA", status:"Seen",
    metadata:{ encryption:"aws:kms", versioning:"enabled" },
    workloads:[
      {name:"aurva-pii-analyzer", ns:"aurva-dataplane-prod", queries:"180K reads / day", role:"read"},
      {name:"data-pipeline-etl", ns:"data-platform", queries:"60K reads / day", role:"read+write"},
      {name:"airflow-scheduler", ns:"data-platform", queries:"24K reads / day", role:"read"},
      {name:"snowflake-loader", ns:"data-platform", queries:"12K reads / day", role:"read"},
      {name:"reports-svc", ns:"reports", queries:"3.2K reads / day", role:"read"},
    ],
    dataVolume:{ size:"4.8 TB", growth:"+82 GB/wk", objects:"38M", queriesPerDay:"280K" },
    sensitiveDataLocked:true,
    risks:[
      {sev:"high", type:"Cross-account access", note:"5 IAM principals from 3 accounts"},
    ],
  },
  {
    id:"s3-public-assets",
    name:"arn:aws:s3:::aurva-public-assets", displayName:"aurva-public-assets",
    accountId: ACC_PROD, hosting:"AWS", location:"Cloud", region:"ap-south-1",
    serviceType:"S3", management:"ProviderManaged", type:"ObjectStorage", port:443,
    host:"aurva-public-assets.s3.ap-south-1.amazonaws.com",
    publicIP:"3.108.x.x", privateIP:null,
    creationSource:"CloudAPI", parentId:null, function:"NA", status:"Seen",
    metadata:{ acl:"public-read" },
    workloads:[{name:"aurva-marketing-site", ns:"web", queries:"—", role:"read"}],
    dataVolume:{ size:"2.1 GB", growth:"+12 MB/wk", objects:"840", queriesPerDay:"—" },
    sensitiveDataLocked:true,
    risks:[
      {sev:"critical", type:"Publicly readable bucket", note:"public-read ACL set on bucket"},
    ],
  },

  // ===== Self-managed MySQL on EKS =====
  {
    id:"k8s-mysql-1",
    name:"mysql-orders-statefulset", displayName:"mysql-orders",
    accountId: ACC_PROD, hosting:"AWS", location:"InsideK8s", region:"ap-south-1",
    serviceType:"None", management:"SelfManaged",
    type:"MySQL", protocol:"MySQL", version:"8.0.36", port:3306,
    host:"mysql-orders.commerce.svc.cluster.local",
    publicIP:null, privateIP:"10.0.55.41",
    creationSource:"EBPF", parentId:null, function:"NA", status:"Seen",
    metadata:{ replicas:3, storage:"gp3", chart:"bitnami/mysql 9.7.2" },
    workloads:[
      {name:"orders-api", ns:"commerce", queries:"2.1M / day", role:"read+write"},
      {name:"checkout", ns:"commerce", queries:"480K / day", role:"read+write"},
    ],
    dataVolume:{ size:"68 GB", growth:"+1.8 GB/wk", tables: 42, queriesPerDay:"2.6M" },
    sensitiveDataLocked:true,
    risks:[
      {sev:"high", type:"CVE-2024-21102", note:"MySQL 8.0.36 — Server: Optimizer DoS"},
    ],
  },

  // ===== BigQuery =====
  {
    id:"bq-analytics",
    name:"projects/aurva-analytics/datasets/events", displayName:"events",
    accountId:"aurva-analytics", hosting:"GCP", location:"Cloud", region:"asia-south1",
    serviceType:"BigQuery", management:"ProviderManaged",
    type:"BigQuery", protocol:"BigQuery", version:"", port:443,
    host:"bigquery.googleapis.com",
    publicIP:null, privateIP:null, creationSource:"CloudAPI", parentId:null,
    function:"NA", status:"Seen",
    metadata:{ table_count:42, total_bytes:"2.1 TB" },
    workloads:[
      {name:"analytics-dash", ns:"analytics", queries:"12K / day", role:"read"},
      {name:"reports-svc", ns:"reports", queries:"3.2K / day", role:"read"},
    ],
    dataVolume:{ size:"2.1 TB", growth:"+44 GB/wk", tables: 42, queriesPerDay:"15K" },
    sensitiveDataLocked:true,
    risks:[],
  },

  // ===== Redshift =====
  {
    id:"rs-warehouse",
    name:"arn:aws:redshift:ap-south-1:145689162369:cluster:aurva-warehouse",
    displayName:"aurva-warehouse",
    accountId: ACC_PROD, hosting:"AWS", location:"Cloud", region:"ap-south-1",
    serviceType:"Redshift", management:"ProviderManaged",
    type:"Redshift", protocol:"PSQL", version:"1.0.84129", port:5439,
    host:"aurva-warehouse.czxcvbn.ap-south-1.redshift.amazonaws.com",
    publicIP:null, privateIP:"10.0.60.10", creationSource:"CloudAPI", parentId:null,
    function:"NA", status:"Seen",
    metadata:{ node_type:"ra3.xlplus", number_of_nodes:4 },
    workloads:[{name:"reports-svc", ns:"reports", queries:"880 / day", role:"read"}],
    dataVolume:{ size:"1.4 TB", growth:"+22 GB/wk", tables: 38, queriesPerDay:"1.1K" },
    sensitiveDataLocked:true,
    risks:[
      {sev:"medium", type:"Stale data", note:"No writes in 14 days"},
    ],
  },

  // ===== ClickHouse self-managed =====
  {
    id:"ch-events",
    name:"clickhouse-events-shard-0", displayName:"clickhouse-events",
    accountId: ACC_PROD, hosting:"AWS", location:"InsideK8s", region:"ap-south-1",
    serviceType:"None", management:"SelfManaged",
    type:"ClickHouse", protocol:"ClickHouse", version:"24.3.2", port:9000,
    host:"clickhouse-events.observability.svc.cluster.local",
    publicIP:null, privateIP:"10.0.70.4", creationSource:"EBPF", parentId:null,
    function:"NA", status:"Seen",
    metadata:{ shards:3, replicas:2 },
    workloads:[
      {name:"telemetry-ingester", ns:"observability", queries:"82K / day", role:"write"},
      {name:"grafana", ns:"observability", queries:"24K / day", role:"read"},
    ],
    dataVolume:{ size:"3.2 TB", growth:"+58 GB/wk", tables: 16, queriesPerDay:"110K" },
    sensitiveDataLocked:true,
    risks:[],
  },

  // ===== Mongo Atlas =====
  {
    id:"mongo-atlas-1",
    name:"projects/64fa.../clusters/aurva-prod", displayName:"aurva-prod (Atlas)",
    accountId:"64fa92...", hosting:"NativeSaaS", location:"Cloud", region:"asia-south1",
    serviceType:"None", management:"ProviderManaged",
    type:"MongoDB", protocol:"MongoDB", version:"7.0.11", port:27017,
    host:"aurva-prod.abc123.mongodb.net",
    connectionEndpoint:"mongodb+srv://aurva-prod.abc123.mongodb.net/",
    publicIP:"34.93.x.x", privateIP:null,
    creationSource:"Manual", parentId:null, function:"NA", status:"Seen",
    metadata:{ tier:"M30", region:"AP_SOUTH_1" },
    workloads:[{name:"aurva-chatbot-llm", ns:"aurva-chatbot-llm", queries:"42K / day", role:"read+write"}],
    dataVolume:{ size:"22 GB", growth:"+0.6 GB/wk", collections: 14, queriesPerDay:"42K" },
    sensitiveDataLocked:true,
    risks:[
      {sev:"high", type:"Public network access", note:"0.0.0.0/0 in IP allowlist"},
      {sev:"low", type:"Manual creation", note:"Source: manual entry, not API-discovered"},
    ],
  },

  // ===== NotSeen Redis =====
  {
    id:"k8s-redis-stale",
    name:"redis-cache-statefulset", displayName:"redis-cache",
    accountId: ACC_PROD, hosting:"AWS", location:"InsideK8s", region:"ap-south-1",
    serviceType:"None", management:"SelfManaged",
    type:"Redis", protocol:"Redis", version:"6.2.5", port:6379,
    host:"redis-cache.legacy.svc.cluster.local",
    publicIP:null, privateIP:"10.0.80.2", creationSource:"EBPF", parentId:null,
    function:"NA", status:"NotSeen",
    metadata:{ chart:"bitnami/redis 17.0.0" }, workloads:[],
    dataVolume:null,
    sensitiveDataLocked:true,
    risks:[
      {sev:"medium", type:"Untracked datasource", note:"Not seen for 9 days"},
      {sev:"low", type:"End-of-life version", note:"Redis 6.2.x EOL"},
    ],
  }
];

// Compute max severity per row.
DA_ROWS.forEach(r => {
  r.maxSev = r.risks?.length ? Math.max(...r.risks.map(x => sevRank[x.sev] || 0)) : 0;
  r.riskCounts = (r.risks || []).reduce((a, x) => ({ ...a, [x.sev]: (a[x.sev]||0) + 1 }), {});
});

// Tint per engine for the inline logo swatch.
const ENGINE_INFO = {
  PSQL:        { label:"PostgreSQL", color:"#336791" },
  MySQL:       { label:"MySQL",      color:"#00758F" },
  MariaDB:     { label:"MariaDB",    color:"#003545" },
  Redshift:    { label:"Redshift",   color:"#8C4FFF" },
  BigQuery:    { label:"BigQuery",   color:"#669DF6" },
  ClickHouse:  { label:"ClickHouse", color:"#FFCC01" },
  MongoDB:     { label:"MongoDB",    color:"#00684A" },
  Redis:       { label:"Redis",      color:"#DC382D" },
  ObjectStorage:{label:"S3",         color:"#E25444" },
};

function groupRows(rows) {
  const byParent = {};
  const top = [];
  rows.forEach(r => {
    if (r.parentId) {
      (byParent[r.parentId] = byParent[r.parentId] || []).push(r);
    } else {
      top.push(r);
    }
  });
  return top.map(r => ({ row: r, children: byParent[r.name] || [] }));
}

window.DA_ROWS = DA_ROWS;
window.ENGINE_INFO = ENGINE_INFO;
window.groupDataAssets = groupRows;
