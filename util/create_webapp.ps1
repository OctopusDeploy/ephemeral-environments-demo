$envName=$OctopusParameters["Octopus.Environment.Name"]
$projectName=$OctopusParameters["Octopus.Project.Name"]
$resourceGroup=$OctopusParameters["ResourceGroup"]
$envRepositoryName=-join('"repositorySiteName": "ephemeral-environments-', $envName, '"')
$webAppExists = az webapp list --resource-group "$resourceGroup" | Select-String "$envRepositoryName"

if ($webAppExists.Matches.Count -eq 0) {
    Write-Host "Creating Web App"
    az webapp create --name ephemeral-environments-$envName --resource-group "$resourceGroup" --deployment-container-image-name ephemeralenvironments.azurecr.io/octopusdeploytesting/ephemeral-environments-demo --plan ephemeral-environments-service-plan --tags octopus-environment=$envName octopus-role=ephemeral-environments octopus-project=$projectName LifeTimeInDays=1
    az resource wait --exists --name ephemeral-environments-$envName --resource-group "$resourceGroup" --resource-type "microsoft.web/sites"
    Write-Host "Web App created"
}
else {
    Write-Host "Web App already exists"
}

$webAppUrl = az webapp show --name ephemeral-environments-$envName --resource-group "$resourceGroup" --query "defaultHostName" -o tsv
Write-Host(-join("https://", $webAppUrl))
