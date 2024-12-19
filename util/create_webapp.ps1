$envName=$OctopusParameters["Octopus.Environment.Name"]
$projectName=$OctopusParameters["Octopus.Project.Name"]
$envRepositoryName=-join('"repositorySiteName": "ephemeral-environments-', $envName, '"')
$webAppExists = az webapp list --resource-group ephemeral-environments | Select-String "$envRepositoryName"

if ($webAppExists.Matches.Count -eq 0) {
    Write-Host "Creating Web App"
    az webapp create --name ephemeral-environments-$envName --resource-group ephemeral-environments --deployment-container-image-name ephemeralenvironments.azurecr.io/octopusdeploytesting/ephemeral-environments-demo --plan ephemeral-environments-service-plan --tags octopus-environment=$envName octopus-role=ephemeral-environments octopus-project=$projectName LifeTimeInDays=1
    az resource wait --exists --name ephemeral-environments-$envName --resource-group ephemeral-environments --resource-type "microsoft.web/sites"
    Write-Host "Web App created"
}
else {
    Write-Host "Web App already exists"
}

$webAppUrl = az webapp show --name ephemeral-environments-$envName --resource-group ephemeral-environments --query "defaultHostName" -o tsv
Write-Host(-join("https://", $webAppUrl))
