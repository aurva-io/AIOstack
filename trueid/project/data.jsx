// Mock inventory data. Each row = one workload.
const CLUSTER = "aurva-uat-plane";
const REGION = "ap-south-1";
const ACCOUNT = "145689162369";

const AI_FRAMEWORKS = ["MXNet","Keras","Flax","TensorFlow","Scikit-learn","PyTorch","LIBSVM"];
const AI_FORMATS = ["Safetensors","ONNX","TorchScript","GGUF","GGML"];
const AI_DL = ["ResNet","LSTM"];
const AI_GENAI = ["Hugging Face","Llama"];
const AI_ML = ["Perceptron"];
const AI_TOOLS = ["ExecuTorch"];

const POLICY_BUCKET = {
  name: "compliance-reports-uat-bucket-access",
  arn: "arn:aws:iam::145689162369:role/compliance-reports-uat-bucket-access",
  policies: [{
    name: "ComplianceReportsReadWrite", type: "AWS Managed",
    statements: 2, resources: 3,
    json: { Version:"2012-10-17", Statement:[
      { Effect:"Allow", Action:["s3:GetObject","s3:PutObject","s3:ListBucket"],
        Resource:["arn:aws:s3:::compliance-reports-uat/*","arn:aws:s3:::compliance-reports-uat"] },
      { Effect:"Allow", Action:["kms:Decrypt","kms:GenerateDataKey"],
        Resource:"arn:aws:kms:ap-south-1:145689162369:key/a1b2c3d4" }
    ]},
    resourceList:[
      { arn:"arn:aws:s3:::compliance-reports-uat", kind:"S3 Bucket", exposure:"private" },
      { arn:"arn:aws:s3:::compliance-reports-uat/*", kind:"S3 Objects", exposure:"private" },
      { arn:"arn:aws:kms:ap-south-1:145689162369:key/a1b2c3d4", kind:"KMS Key", exposure:"private" }
    ]
  }]
};

const POLICY_COSTANALYZER = {
  name: "CostanalyzerHubRole",
  arn: "arn:aws:iam::145689162369:role/CostanalyzerHubRole",
  policies:[
    { name:"CostExplorerReadOnly", type:"AWS Managed", statements:1, resources:1,
      json:{ Version:"2012-10-17", Statement:[{ Effect:"Allow",
        Action:["ce:GetCostAndUsage","ce:GetCostForecast"], Resource:"*" }]},
      resourceList:[{ arn:"* (Cost Explorer API)", kind:"Billing", exposure:"account-wide" }]},
    { name:"OrganizationsReadAccounts", type:"Inline", statements:1, resources:1,
      json:{ Version:"2012-10-17", Statement:[{ Effect:"Allow",
        Action:["organizations:ListAccounts"], Resource:"*" }]},
      resourceList:[{ arn:"* (AWS Organizations)", kind:"Org Metadata", exposure:"account-wide" }]}
  ]
};

const POLICY_DATAPIPE = {
  name: "data-pipeline-access",
  arn: "arn:aws:iam::145689162369:role/data-pipeline-access",
  policies:[{
    name:"DataPipelineFullAccess", type:"AWS Managed",
    statements: 3, resources: 5,
    json:{ Version:"2012-10-17", Statement:[
      { Effect:"Allow", Action:"rds:*", Resource:"arn:aws:rds:ap-south-1:145689162369:db:*" },
      { Effect:"Allow", Action:"dynamodb:*", Resource:"arn:aws:dynamodb:*:145689162369:table/*" },
      { Effect:"Allow", Action:"s3:*", Resource:"*" }
    ]},
    resourceList:[
      { arn:"arn:aws:rds:ap-south-1:145689162369:db:prod-pii", kind:"RDS Instance", exposure:"private", isDb:true },
      { arn:"arn:aws:rds:ap-south-1:145689162369:db:staging-pii", kind:"RDS Instance", exposure:"private", isDb:true },
      { arn:"arn:aws:dynamodb:ap-south-1:145689162369:table/audit-logs", kind:"DynamoDB Table", exposure:"private", isDb:true },
      { arn:"arn:aws:s3:::data-lake-raw", kind:"S3 Bucket", exposure:"private" },
      { arn:"arn:aws:s3:::data-lake-curated", kind:"S3 Bucket", exposure:"private" }
    ]
  }]
};

// Risk severity: critical > high > medium > low > none
const sev = (s) => ({ critical:4, high:3, medium:2, low:1, none:0 }[s] || 0);

const mk = (o) => ({ cluster: CLUSTER, region: REGION, account: ACCOUNT, cloud: "AWS", ...o });

const ROWS = [
  mk({
    id:"aurva-pii-analyzer-uat", name:"aurva-pii-analyzer", kind:"Deployment",
    namespace:"aurva-dataplane-uat",
    isAI:true, exposure:"External",
    aiEndpoints:[{name:"OpenAI",color:"#10a37f"},{name:"Anthropic",color:"#c96442"}],
    dataTags:["AI Model File Formats","+5"],
    dbEndpoints:[{name:"PSQL",count:1}],
    volume:{calls:"40.9K",data:"11.3 GB"}, owner:"Bar Cohen", review:"Reviewed",
    serviceAccount:"aurva-pii-analyzer", iamRole: POLICY_DATAPIPE,
    potentiallyPublic:true,
    loadBalancer:"aurva-uat-public-276784403.ap-south-1.elb.amazonaws.com",
    host:"pii.uat.aurva.io",
    risks:[
      { sev:"critical", type:"Zombie AI", msg:"AI app with no traffic in 30d but still retains S3 write access." },
      { sev:"high",     type:"PII Exposure", msg:"Processes PII and calls external OpenAI endpoint." },
      { sev:"medium",   type:"Overly Permissive IAM", msg:"Role has s3:* on all buckets." }
    ],
    ai:{ modelFormats: AI_FORMATS, dl: AI_DL, frameworks: AI_FRAMEWORKS, genai: AI_GENAI, ml: AI_ML, tools: AI_TOOLS }
  }),
  mk({
    id:"aurva-pii-analyzer-staging", name:"aurva-pii-analyzer", kind:"Deployment",
    namespace:"aurva-dataplane-staging",
    isAI:true, exposure:"External",
    aiEndpoints:[{name:"OpenAI",color:"#10a37f"}],
    dbEndpoints:[{name:"PSQL",count:1}],
    volume:{calls:"32.7K",data:"10.1 GB"}, owner:"Shai Neri", review:"Open",
    serviceAccount:"aurva-pii-analyzer", iamRole: POLICY_DATAPIPE,
    potentiallyPublic:true,
    loadBalancer:"aurva-uat-public-276784403.ap-south-1.elb.amazonaws.com",
    host:"pii-staging.uat.aurva.io",
    risks:[
      { sev:"high",   type:"PII Exposure", msg:"Calls external OpenAI API." },
      { sev:"medium", type:"Zombie AI", msg:"No AI traffic in last 14d." }
    ]
  }),
  mk({
    id:"aurva-doc-classifier-uat", name:"aurva-doc-classifier", kind:"Deployment",
    namespace:"aurva-dataplane-uat",
    isAI:true, exposure:"Internal",
    aiEndpoints:[{name:"Bedrock",color:"#f2a82d"}],
    dbEndpoints:[{name:"PSQL",count:1}],
    volume:{calls:"26.9K",data:"8.4 GB"}, owner:"Bar Cohen", review:"Open",
    serviceAccount:"aurva-doc-classifier-sa", iamRole: POLICY_BUCKET,
    potentiallyPublic:false,
    risks:[
      { sev:"medium", type:"Zombie AI", msg:"Last invocation 12d ago." }
    ]
  }),
  mk({
    id:"aurva-pii-analyzer-prod", name:"aurva-pii-analyzer", kind:"Deployment",
    cluster:"aurva-prod-plane", namespace:"aurva-dataplane-prod",
    isAI:true, exposure:"External",
    aiEndpoints:[{name:"OpenAI",color:"#10a37f"},{name:"Anthropic",color:"#c96442"}],
    dbEndpoints:[{name:"PSQL",count:1}],
    volume:{calls:"31.3K",data:"8.3 GB"}, owner:"Shai Neri", review:"Reviewed",
    serviceAccount:"aurva-pii-analyzer", iamRole: POLICY_DATAPIPE,
    potentiallyPublic:true,
    risks:[
      { sev:"critical", type:"PII Exposure", msg:"Production workload sends PII to external LLM providers." },
      { sev:"high",     type:"Overly Permissive IAM", msg:"Role has s3:* on all buckets." }
    ]
  }),
  mk({
    id:"aurva-ocr-staging", name:"aurva-ocr", kind:"Deployment",
    namespace:"aurva-dataplane-staging",
    isAI:true, exposure:"Internal",
    aiEndpoints:[{name:"Bedrock",color:"#f2a82d"}],
    dbEndpoints:[{name:"PSQL",count:1}],
    volume:{calls:"23.2K",data:"2.9 GB"}, owner:"Kris Nasser", review:"Open",
    serviceAccount:"aurva-ocr-sa", iamRole: POLICY_BUCKET,
    potentiallyPublic:false,
    risks:[{ sev:"low", type:"Stale model", msg:"Model artifact older than 90 days." }]
  }),
  mk({
    id:"aurva-ocr-uat", name:"aurva-ocr", kind:"Deployment",
    namespace:"aurva-dataplane-uat",
    isAI:true, exposure:"Internal",
    aiEndpoints:[{name:"Bedrock",color:"#f2a82d"}],
    dbEndpoints:[{name:"PSQL",count:1}],
    volume:{calls:"15.4K",data:"1.8 GB"}, owner:"Katie Kay", review:"Reviewed",
    serviceAccount:"aurva-ocr-sa", iamRole: POLICY_BUCKET,
    potentiallyPublic:false, risks:[]
  }),
  mk({
    id:"aurva-command", name:"aurva-command", kind:"Deployment",
    namespace:"aurva-command",
    isAI:false, exposure:"External",
    serviceAccount:"aurva-command-sa", iamRole: POLICY_BUCKET,
    potentiallyPublic:true,
    loadBalancer:"aurva-uat-public-276784403.ap-south-1.elb.amazonaws.com",
    host:"command.uat.aurva.io", owner:"Alex Kim",
    risks:[{ sev:"high", type:"Publicly exposed", msg:"Deployment reachable from the public internet." }]
  }),
  mk({
    id:"costanalyzer-dep", name:"costanalyzer-dep", kind:"Deployment",
    namespace:"aurva-costanalyzer",
    isAI:false, exposure:"External",
    serviceAccount:"costanalyzer-sa", iamRole: POLICY_COSTANALYZER,
    potentiallyPublic:true,
    loadBalancer:"aurva-uat-internal-837361.ap-south-1.elb.amazonaws.com",
    host:"costs.uat.aurva.io", owner:"Jon Shalev",
    risks:[{ sev:"medium", type:"Wildcard resource", msg:"Cost Explorer policy uses Resource: \"*\"." }]
  }),
  mk({
    id:"aurva-bifrost", name:"aurva-bifrost", kind:"Deployment",
    namespace:"aurva-bifrost", cluster:"aurva-dev-plane",
    isAI:false, exposure:"External",
    serviceAccount:"aurva-bifrost", iamRole:null,
    potentiallyPublic:true, owner:"—",
    risks:[{ sev:"high", type:"Naked Pod", msg:"Public LB with no IAM role attached — missing audit trail." }]
  }),
  mk({
    id:"aurva-chatbot-llm", name:"aurva-chatbot-llm", kind:"StatefulSet",
    namespace:"aurva-chatbot-llm",
    isAI:true, exposure:"Internal",
    aiEndpoints:[{name:"OpenAI",color:"#10a37f"}],
    dbEndpoints:[{name:"Redis",count:2}],
    volume:{calls:"8.1K",data:"640 MB"}, owner:"Priya R.", review:"Open",
    serviceAccount:"aurva-chatbot-llm", iamRole:null,
    potentiallyPublic:false,
    risks:[{ sev:"medium", type:"Zombie AI", msg:"Low-activity AI workload." }]
  }),
  mk({
    id:"aurva-alerts", name:"aurva-alerts", kind:"Deployment",
    namespace:"aurva-alerts",
    isAI:false, exposure:"Internal",
    serviceAccount:"aurva-alerts-sa", iamRole: POLICY_BUCKET,
    potentiallyPublic:false, owner:"Dana Vered", risks:[]
  }),
  mk({
    id:"aurva-gateway", name:"aurva-gateway", kind:"Deployment",
    namespace:"aurva-gateway",
    isAI:false, exposure:"External",
    serviceAccount:"aurva-gateway-sa", iamRole: POLICY_BUCKET,
    potentiallyPublic:true,
    loadBalancer:"aurva-uat-public-276784403.ap-south-1.elb.amazonaws.com",
    host:"gateway.uat.aurva.io", owner:"Alex Kim",
    risks:[{ sev:"low", type:"TLS version", msg:"Ingress allows TLS 1.1." }]
  }),
  mk({
    id:"aurva-argocd", name:"aurva-argocd-application-controller", kind:"StatefulSet",
    namespace:"argocd",
    isAI:true, exposure:"Internal",
    aiEndpoints:[], dbEndpoints:[{name:"Redis",count:2}],
    volume:{calls:"1.0K",data:"819.9 MB"}, owner:"Jon Shalev", review:"Open",
    serviceAccount:"argocd-application-controller", iamRole:null,
    potentiallyPublic:false,
    risks:[{ sev:"low", type:"Inactive AI", msg:"AI signals low; likely a false positive." }]
  }),
];

// Derived helpers
ROWS.forEach(r => {
  r.risks = r.risks || [];
  // Sum resources from IAM role
  r.resourceCount = r.iamRole ? r.iamRole.policies.reduce((acc, p) => acc + p.resourceList.length, 0) : 0;
  r.dbAccessCount = r.iamRole ? r.iamRole.policies.reduce((acc, p) => acc + p.resourceList.filter(x => x.isDb).length, 0) : 0;
  r.policyCount = r.iamRole ? r.iamRole.policies.length : 0;
  // Highest risk severity
  r.maxSev = r.risks.reduce((m, x) => Math.max(m, sev(x.sev)), 0);
  r.riskCounts = r.risks.reduce((acc, x) => { acc[x.sev] = (acc[x.sev]||0)+1; return acc; }, {});
});

window.INVENTORY_ROWS = ROWS;
window.POLICY_BUCKET = POLICY_BUCKET;
window.POLICY_COSTANALYZER = POLICY_COSTANALYZER;
window.POLICY_DATAPIPE = POLICY_DATAPIPE;
window.sev = sev;

window.SEV_COLORS = {
  critical: { bg:'#fbe3e3', border:'#e9a9a9', fg:'#8a2a2a', dot:'#d14343' },
  high:     { bg:'#fdecd2', border:'#eac78a', fg:'#8a5a15', dot:'#d98f00' },
  medium:   { bg:'#fdf6d3', border:'#f0e5a3', fg:'#8a6f0c', dot:'#b89615' },
  low:      { bg:'#e9f0f8', border:'#b8cde0', fg:'#2f5a8a', dot:'#4f7aa8' },
  none:     { bg:'#f5f5f4', border:'#e7e5e4', fg:'#78716c', dot:'#a8a29e' }
};
