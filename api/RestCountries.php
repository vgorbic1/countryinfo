<?php
require '../vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Exception\ClientException;

class RestCountries
{
    // Guzzle Client instance
    private $guzzleClient;

    //Fields to filter response
    private $fields;

    //  Constructor with base url
    public function __construct()
    {
        $this->guzzleClient = new Client([
            "base_uri" => "https://restcountries.eu/rest/v2/",
        ]);
        $this->fields = [];
    }

    // Include only the specified fields
    public function fields(array $fields)
    {
        $this->fields = $fields;
        return $this;
    }
    
    // Search by country name. It can be the native name or partial name
    public function byName($name, $isFullName = false)
    {
        $fullNameRequest = ($isFullName ? ["fullText" => "true"] : []);
        $url = sprintf("name/%s", $name);
        return $this->execute($url, $fullNameRequest);
    }

    // Search by country code
    public function byCodes($codes)
    {
        if (is_array($codes)) {
            return $this->execute("alpha", [
                "codes" => implode(";", $codes)
            ]);
        }
        return $this->execute("alpha/" . $codes);
    }

    // Execute request
    private function execute($url, $requestParams = [])
    {
        if (count($this->fields)) {
            $requestParams = array_merge($requestParams, [
                "fields" => implode(";", $this->fields),
            ]);
            $this->fields = [];
        }
        try { 
            $response = $this->guzzleClient->get($url, ["query" => $requestParams,]);
            return $response->getBody()->getContents();
        } catch (ClientException $e) {
            $response = $e->getResponse();
            if ($response && $response->getStatusCode() >= 400) {
              return false;
            }
        }
    }
}