<?php
/**
 * WHMCS SDK Sample Addon Module
 *
 * An addon module allows you to add additional functionality to WHMCS. It
 * can provide both client and admin facing user interfaces, as well as
 * utilise hook functionality within WHMCS.
 *
 * This sample file demonstrates how an addon module for WHMCS should be
 * structured and exercises all supported functionality.
 *
 * Addon Modules are stored in the /modules/addons/ directory. The module
 * name you choose must be unique, and should be all lowercase, containing
 * only letters & numbers, always starting with a letter.
 *
 * Within the module itself, all functions must be prefixed with the module
 * filename, followed by an underscore, and then the function name. For this
 * example file, the filename is "addonmodule" and therefore all functions
 * begin "mobix_".
 *
 * For more information, please refer to the online documentation.
 *
 * @see https://developers.whmcs.com/addon-modules/
 *
 * @copyright Copyright (c) WHMCS Limited 2017
 * @license http://www.whmcs.com/license/ WHMCS Eula
 */

if (!defined("WHMCS")) {
    die("This file cannot be accessed directly");
}

/**
 * Define addon module configuration parameters.
 *
 * Includes a number of required system fields including name, description,
 * author, language and version.
 *
 * Also allows you to define any configuration parameters that should be
 * presented to the user when activating and configuring the module. These
 * values are then made available in all module function calls.
 *
 * Examples of each and their possible configuration parameters are provided in
 * the fields parameter below.
 *
 * @return array
 */
function mobix_config()
{
    return array(
        'name' => 'Mobix', // Display name for your module
        'description' => 'This module provides an example WHMCS Addon Module which can be used as a basis for building a custom addon module.', // Description displayed within the admin interface
        'author' => 'Your name goes here', // Module author name
        'language' => 'english', // Default language
        'version' => '1.0', // Version number
        'fields' => []
    );
}

/**
 * Activate.
 *
 * Called upon activation of the module for the first time.
 * Use this function to perform any database and schema modifications
 * required by your module.
 *
 * This function is optional.
 *
 * @return array Optional success/failure message
 */
function mobix_activate()
{
    // Create custom tables and schema required by your module
    // $query = "CREATE TABLE `mod_addonexample` (`id` INT( 1 ) NOT NULL AUTO_INCREMENT PRIMARY KEY ,`demo` TEXT NOT NULL )";
    // full_query($query);

    return array(
        'status' => 'success', // Supported values here include: success, error or info
        'description' => 'This is a demo module only. In a real module you might report an error/failure or instruct a user how to get started with it here.',
    );
}

/**
 * Deactivate.
 *
 * Called upon deactivation of the module.
 * Use this function to undo any database and schema modifications
 * performed by your module.
 *
 * This function is optional.
 *
 * @return array Optional success/failure message
 */
function mobix_deactivate()
{
    // Undo any database and schema modifications made by your module here
    // $query = "DROP TABLE `mod_addonexample`";
    // full_query($query);

    return array(
        'status' => 'success', // Supported values here include: success, error or info
        'description' => 'This is a demo module only. In a real module you might report an error/failure here.',
    );
}

/**
 * Upgrade.
 *
 * Called the first time the module is accessed following an update.
 * Use this function to perform any required database and schema modifications.
 *
 * This function is optional.
 *
 * @return void
 */
function mobix_upgrade($vars)
{
    // $currentlyInstalledVersion = $vars['version'];

    // /// Perform SQL schema changes required by the upgrade to version 1.1 of your module
    // if ($currentlyInstalledVersion < 1.1) {
    //     $query = "ALTER `mod_addonexample` ADD `demo2` TEXT NOT NULL ";
    //     full_query($query);
    // }

    // /// Perform SQL schema changes required by the upgrade to version 1.2 of your module
    // if ($currentlyInstalledVersion < 1.2) {
    //     $query = "ALTER `mod_addonexample` ADD `demo3` TEXT NOT NULL ";
    //     full_query($query);
    // }
}

/**
 * Admin Area Output.
 *
 * Called when the addon module is accessed via the admin area.
 * Should return HTML output for display to the admin user.
 *
 * This function is optional.
 *
 * @see AddonModule\Admin\Controller@index
 *
 * @return string
 */
function mobix_output($vars)
{
    echo "<script>
      window.depts = '".$vars['access']."';
      window.adminid = '".$_SESSION['adminid']."';
    </script>";
    require_once 'www/index.html';
}

/**
 * Admin Area Sidebar Output.
 *
 * Used to render output in the admin area sidebar.
 * This function is optional.
 *
 * @param array $vars
 *
 * @return string
 */
function mobix_sidebar($vars)
{

    $sidebar = '<span class="header"><img src="images/icons/addonmodules.png" class="absmiddle" width="16" height="16" /> Mobix </span>';

    return $sidebar;
}

/**
 * Client Area Output.
 *
 * Called when the addon module is accessed via the client area.
 * Should return an array of output parameters.
 *
 * This function is optional.
 *
 * @see AddonModule\Client\Controller@index
 *
 * @return array
 */
function mobix_clientarea($vars)
{
    // // Get common module parameters
    // $modulelink = $vars['modulelink']; // eg. index.php?m=addonmodule
    // $version = $vars['version']; // eg. 1.0
    // $_lang = $vars['_lang']; // an array of the currently loaded language variables

    // // Get module configuration parameters
    // $configTextField = $vars['Text Field Name'];
    // $configPasswordField = $vars['Password Field Name'];
    // $configCheckboxField = $vars['Checkbox Field Name'];
    // $configDropdownField = $vars['Dropdown Field Name'];
    // $configRadioField = $vars['Radio Field Name'];
    // $configTextareaField = $vars['Textarea Field Name'];

    // // Dispatch and handle request here. What follows is a demonstration of one
    // // possible way of handling this using a very basic dispatcher implementation.

    // $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

    // $dispatcher = new ClientDispatcher();
    // return $dispatcher->dispatch($action, $vars);
}