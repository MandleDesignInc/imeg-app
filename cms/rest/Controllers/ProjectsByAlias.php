<?php
/**
 * Created by Justin McDanel
 * Date: 2/10/19
 */

class MyControllerProjectsByAlias extends modRestController {
    public $classKey = 'modResource';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
    public $primaryKeyField = 'alias';

    public function read($alias) {
        $alias = $_GET['alias'];
        $this->object = $this->modx->getObject($this->classKey, array('alias' => $alias));
        if (empty($this->object)) {
            return $this->failure($this->modx->lexicon('rest.err_obj_nf',array(
                'class_key' => $this->classKey,
            )));
        }
        //$objectArray = $this->object->toArray();
        $objectArray = array();
        $objectArray['projects'] =  $this->getCurrentPage();

        return $this->success('',$objectArray);
    }

    public function getCurrentPage() {
        $id = $this->object->id;
        $page = array();

        $page['id'] = $id;
        $page['title'] = $this->object->pagetitle;
        $page['subtitle'] = $this->getTemplateVariable($id, 36, true);
        $page['alias'] = $this->object->alias;
        $page['content'] = $this->object->content;
        $page['headerImage'] = $this->getTemplateVariable($id, 25);
        $page['previewImage'] = $this->getTemplateVariable($id, 31);
        $page['location'] = $this->getTemplateVariable($id, 26);
        $page['size'] = $this->getTemplateVariable($id, 27);
        $page['sidebarContent'] = $this->getTemplateVariable($id, 28, true);
        $page['tags'] = $this->getTags($id);

        return $page;
    }

    public function getTemplateVariable($id, $tvId, $richText = false) {

        $tv = $this->modx->getObject('modTemplateVarResource', array('tmplvarid' => $tvId, 'contentid' => $id));

        if ($tv) return $tv->get('value');

        return '';

    }

    public function formatTag($tag) {
        $pipesToCommas= str_replace('||', ',', $tag);
        $spaceToDashes = str_replace(' ', '-', strtolower($pipesToCommas));
        $lower = strtolower($spaceToDashes);
        return $lower;
    }
    public function formatTagBreaks($tag) {
        $pipesToCommas= str_replace('||', ',', $tag);
        $spaceToDashes = str_replace(',', '', strtolower($pipesToCommas));
        $lower = strtolower($spaceToDashes);
        return $lower;
    }

    public function getSelectedTagData($tag) {
        $tagList = array();
        $tagList['services'] = json_decode($this->getTemplateVariable(23, 32), true);
        $tagList['markets'] = json_decode($this->getTemplateVariable(24, 32), true);


        $result = array();
        $result['headerImage'] = 'default';
        $result['tag'] = 'default';
        $result['content'] = 'default';

        foreach ($tagList as $list) {
            foreach ($list as $item) {
                if ($this->formatTag($item['name']) == $tag) {
                    $result['headerImage'] = $item['image'];
                    $result['tag'] = $item['name'];
                    $result['content'] = $item['text'];

                    break 2;
                }
            }
        }

        return $result;
    }

    public function getTags($id) {
        $result = array();

        $result['services'] = explode(',', $this->formatTag($this->getTemplateVariable($id, 33)));
        $result['markets'] = explode(',', $this->formatTag($this->getTemplateVariable($id, 35)));

        foreach ($result as $item) {

            foreach ($item as $tag) {

                $this->formatTag($tag);
            }
        }

        return $result;
    }



}
